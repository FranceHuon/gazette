import { execSync } from 'node:child_process'
import process from 'node:process'

// Install dependencies if not present
try {
  await import('puppeteer')
}
catch {
  console.log('📦 Installing dependencies...')
  execSync('pnpm add -w lighthouse puppeteer wait-on', { stdio: 'inherit' })
}

// Install Chrome for Puppeteer
console.log('🌐 Installing Chrome for Puppeteer...')
execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' })

const puppeteer = await import('puppeteer')

// Configuration
const BACKEND_URL = 'http://localhost:3000'
const FRONTEND_URL = 'http://localhost:3002'

// Pages à auditer
const PAGES_TO_AUDIT = [
  '/login',
  '/signin', // Pages publiques
  '/explore',
  '/library',
  '/subscriptions',
  '/settings', // Pages protégées
]

async function loginAndGetCookie(testUser) {
  console.log('🔐 Logging in...')

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    console.log(`🌐 Navigating to: ${FRONTEND_URL}/login`)
    await page.goto(`${FRONTEND_URL}/login`, { waitUntil: 'networkidle0' })
    
    console.log('📝 Filling login form...')
    await page.type('input[name="email"]', testUser.email)
    await page.type('input[name="password"]', testUser.password)
    await page.click('button[type="submit"]')
    
    console.log('⏳ Waiting for navigation...')
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    const cookies = await page.cookies()
    console.log(`🍪 Found ${cookies.length} cookies`)
    const authCookie = cookies.find(cookie => cookie.name === 'token')

    if (authCookie) {
      console.log('✅ Authentication successful')
      return authCookie
    }
    else {
      console.log('❌ No auth cookie found')
      console.log('🍪 Available cookies:', cookies.map(c => c.name))
      return null
    }
  }
  finally {
    await browser.close()
  }
}

async function runLighthouseAudit(authCookie) {
  console.log('🔍 Running Lighthouse audit...')

  for (const page of PAGES_TO_AUDIT) {
    console.log(`📊 Auditing ${page}`)

    const url = `${FRONTEND_URL}${page}`
    const outputPath = `./lighthouse-report-${page.replace('/', '')}.html`

    try {
      const lighthouseCommand = [
        'npx lighthouse',
        url,
        '--only-categories=accessibility',
        '--quiet',
        '--chrome-flags="--headless --no-sandbox --disable-setuid-sandbox"',
        '--output html',
        `--output-path ${outputPath}`,
        `--extra-headers '{"Cookie": "token=${authCookie.value}"}'`,
      ].join(' ')

      console.log(`🔍 Running: ${lighthouseCommand}`)
      const result = execSync(lighthouseCommand, { encoding: 'utf8' })
      console.log(`✅ ${page} completed`)

      // Vérifier si le fichier a été créé
      const fs = await import('node:fs')
      if (fs.existsSync(outputPath)) {
        console.log(`📄 Report saved: ${outputPath}`)
      }
      else {
        console.log(`⚠️ Report not found: ${outputPath}`)
      }

      // Extraire et afficher le score d'accessibilité
      const accessibilityMatch = result.match(/Accessibility.*?(\d+)/)
      if (accessibilityMatch) {
        console.log(`📊 ${page} - Score accessibilité: ${accessibilityMatch[1]}/100`)
      }
    }
    catch (error) {
      console.log(`❌ ${page} failed:`, error.message)
      console.log(`🔍 Full error:`, error)
    }
  }

  console.log('🎉 All audits completed!')
}

async function createTestUser() {
  console.log('👤 Creating test user...')

  const testUser = {
    pseudo: 'lighthouse-test',
    email: 'lighthouse-test@example.com',
    password: 'test123456',
  }

  try {
    console.log(`🔗 Trying to connect to: ${BACKEND_URL}/users`)
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    })

    console.log(`📡 Response status: ${response.status}`)
    if (response.ok) {
      console.log('✅ Test user created')
      return testUser
    }
    else {
      console.log('ℹ️ Test user already exists')
      return testUser
    }
  }
  catch (error) {
    console.log('⚠️ Could not create test user:', error.message)
    console.log('🔍 Full error:', error)
    return testUser
  }
}

async function main() {
  console.log('🚀 Starting Lighthouse audit...')

  const testUser = await createTestUser()
  const authCookie = await loginAndGetCookie(testUser)

  if (authCookie) {
    await runLighthouseAudit(authCookie)
  }
  else {
    console.log('❌ Cannot run audit without authentication')
    process.exit(1)
  }
}

main().catch(console.error)
