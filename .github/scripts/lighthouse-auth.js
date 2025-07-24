const process = require('node:process')
const puppeteer = require('puppeteer')

// Configuration
const BACKEND_URL = 'http://localhost:3000'
const FRONTEND_URL = 'http://localhost:3002'

// Pages à auditer (ordre : publiques d'abord, puis protégées)
const PAGES_TO_AUDIT = [
  '/login', // Page publique
  '/signin', // Page publique
  '/explore', // Page protégée
  '/library', // Page protégée
  '/subscriptions', // Page protégée
  '/settings', // Page protégée
]

async function loginAndGetCookie(testUser) {
  console.log('🔐 Logging in and getting cookie...')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()

    // Aller sur la page de login
    await page.goto(`${FRONTEND_URL}/login`, { waitUntil: 'networkidle0' })

    // Remplir le formulaire de connexion
    await page.type('input[name="email"]', testUser.email)
    await page.type('input[name="password"]', testUser.password)

    // Cliquer sur le bouton de connexion
    await page.click('button[type="submit"]')

    // Attendre la redirection
    await page.waitForNavigation({ waitUntil: 'networkidle0' })

    // Récupérer tous les cookies
    const cookies = await page.cookies()
    const authCookie = cookies.find(cookie => cookie.name === 'token')

    if (authCookie) {
      console.log('✅ Authentication successful, cookie retrieved')
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
  console.log('🔍 Running Lighthouse audit...')

  const { execSync } = require('node:child_process')

  for (const page of PAGES_TO_AUDIT) {
    console.log(`📊 Auditing page: ${page}`)

    const url = `${FRONTEND_URL}${page}`
    const outputPath = `./lighthouse-report-${page.replace('/', '')}.html`

    try {
      // Construire la commande Lighthouse avec le cookie d'authentification
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

      execSync(lighthouseCommand, { stdio: 'inherit' })
      console.log(`✅ Audit completed for ${page}`)
    }
    catch (error) {
      console.log(`❌ Audit failed for ${page}:`, error.message)
    }
  }

  console.log('🎉 All Lighthouse audits completed!')
}

async function createTestUser() {
  console.log('👤 Creating test user...')

  const testUser = {
    pseudo: 'lighthouse-test',
    email: 'lighthouse-test@example.com',
    password: 'test123456',
  }

  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    })

    if (response.ok) {
      console.log('✅ Test user created successfully')
      return testUser
    }
    else {
      // Si l'utilisateur existe déjà, on continue
      console.log('ℹ️ Test user already exists, continuing...')
      return testUser
    }
  }
  catch (error) {
    console.log('⚠️ Could not create test user, continuing...', error.message)
    return testUser
  }
}

async function main() {
  console.log('🚀 Starting Lighthouse authentication script...')

  // Étape 2 - Créer l'utilisateur de test
  const testUser = await createTestUser()

  // Étape 3 - Se connecter et récupérer le cookie
  const authCookie = await loginAndGetCookie(testUser)

  // Étape 4 - Configurer Lighthouse avec l'auth
  if (authCookie) {
    await runLighthouseAudit(authCookie)
  }
  else {
    console.log('❌ Cannot run Lighthouse audit without authentication')
    process.exit(1)
  }
}

main().catch(console.error)
