export default {
  ci: {
    collect: {
      startServerCommand: 'docker compose up --build -d',
      startServerReadyPattern: 'Container gazette-frontend-1.*Started',
      startServerReadyTimeout: 60000,
      numberOfRuns: 1,
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
