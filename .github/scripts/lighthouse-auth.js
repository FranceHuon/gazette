import { execSync } from 'node:child_process'
import process from 'node:process'

// INSTALLATION DES DÉPENDANCES
try {
  await import('puppeteer')
}
catch {
  console.log('📦 Installing dependencies...')
  execSync('pnpm add -w lighthouse puppeteer wait-on', { stdio: 'inherit' })
}

// INSTALLATION DE CHROME POUR PUPPETEER
console.log('🌐 Installing Chrome for Puppeteer...')
execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' })

const puppeteer = await import('puppeteer')

// CONFIGURATION
const BACKEND_URL = 'http://localhost:3000'
const FRONTEND_URL = 'http://localhost:3002'

const PAGES_TO_AUDIT = [
  '/login',
  '/signup',
  '/articles',
  '/medias',
  '/settings',
]

async function loginAndGetCookie(testUser) {
  console.log('🔐 Logging in...')

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.goto(`${FRONTEND_URL}/login`, { waitUntil: 'networkidle0' })

    await page.type('input[name="email"]', testUser.email)
    await page.type('input[name="password"]', testUser.password)
    await page.click('button[type="submit"]')

    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const cookies = await page.cookies()
    const authCookie = cookies.find(cookie => cookie.name === 'token')

    if (authCookie) {
      console.log('✅ Authenticated')
      return authCookie
    }
    else {
      console.log('❌ No auth cookie found')
      return null
    }
  }
  finally {
    await browser.close()
  }
}

async function runLighthouseAudit(authCookie) {
  console.log('🔍 Starting Lighthouse audits...')

  for (const page of PAGES_TO_AUDIT) {
    const url = `${FRONTEND_URL}${page}`
    const outputPath = `./lighthouse-report-${page.replace('/', '')}.html`

    try {
      const lighthouseCommand = [
        'npx lighthouse',
        `"${url}"`,
        '--only-categories=accessibility',
        '--quiet',
        '--chrome-flags="--headless --no-sandbox --disable-setuid-sandbox"',
        `--output=html`,
        `--output-path="${outputPath}"`,
        `--extra-headers='{"Cookie":"token=${authCookie?.value}"}'`,
      ].join(' ')

      console.log(`🚀 Running: ${lighthouseCommand}`)
      const result = execSync(lighthouseCommand, { encoding: 'utf8' })

      const accessibilityMatch = result.match(/Accessibility.*?(\d+)/)
      if (accessibilityMatch) {
        console.log(`📊 ${page} - Accessibilité: ${accessibilityMatch[1]}/100`)
      }

      const fs = await import('node:fs')
      if (fs.existsSync(outputPath)) {
        console.log(`📄 Report saved: ${outputPath}`)
      }
    }
    catch (error) {
      console.error(`❌ Audit failed for ${page}:`, error.message)
      process.exit(1)
    }
  }
}

async function createTestUser() {
  const testUser = {
    pseudo: 'lighthouse-test',
    email: 'lighthouse-test@example.com',
    password: 'test123456',
  }

  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    })

    if (response.ok || response.status === 409) {
      // 409: conflit si l'utilisateur existe déjà
      return testUser
    }
    else {
      throw new Error('Failed to create test user')
    }
  }
  catch (error) {
    console.error('⚠️ Error creating test user:', error.message)
    throw error
  }
}

async function waitForService(url, label) {
  console.log(`⏳ Waiting for ${label}...`)

  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(url)
      if (res.ok || res.status === 404) {
        console.log(`✅ ${label} is ready`)
        return true
      }
    }
    catch {}
    await new Promise(res => setTimeout(res, 1000))
  }

  console.log(`❌ ${label} not ready after timeout`)
  return false
}

async function main() {
  console.log('🚀 Starting audit script')

  const backendReady = await waitForService(`${BACKEND_URL}/users`, 'Backend')
  const frontendReady = await waitForService(`${FRONTEND_URL}/login`, 'Frontend')

  if (!backendReady || !frontendReady) {
    process.exit(1)
  }

  const testUser = await createTestUser()
  const authCookie = await loginAndGetCookie(testUser)

  if (authCookie) {
    await runLighthouseAudit(authCookie)
  }
  else {
    console.error('❌ No auth cookie, aborting')
    process.exit(1)
  }
}

main().catch(console.error)
