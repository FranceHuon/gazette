// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  // Configures for antfu's config and global rules
  {
    react: true,
    typescript: true,
    css: true,
    html: true,
    ignores: [
      '**/dist/',
      '**/temp/',
      '**/node_modules/',
      '**/.next/',
      '**/coverage/',
      '**/build/',
      '**/.vercel/',
    ],
  },
  // Starting from the second arguments they are ESLint Flat Configs
  // Careful, antfu renames some plugins for consistency https://github.com/antfu/eslint-config?tab=readme-ov-file#plugins-renaming
  {
    files: ['apps/backend/**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'node/prefer-global/process': ['error', 'always'],
      'ts/no-unused-vars': 'warn',
      'ts/no-explicit-any': 'warn',
    },
  },
  {
    files: ['apps/frontend/**/*.ts', 'apps/frontend/**/*.tsx'],
    rules: {
      'ts/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      'node/prefer-global/process': 'off',
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'ts/no-unused-vars': 'warn',
      'ts/no-explicit-any': 'warn',
    },
  },
)
