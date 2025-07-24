import process from 'node:process'

export default {
  ci: {
    collect: {
      url: [`http://localhost:${process.env.FRONTEND_PORT || 3002}/`],
      startServerCommand: 'docker compose up --build -d',
      startServerReadyPattern: 'Container gazette-frontend-1.*Started',
      startServerReadyTimeout: 60000,
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
