// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  // Global configuration
  {
    react: true,
    typescript: true,
    css: true,
    html: true,
    markdown: true,
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    ignores: [
      // Build outputs
      '**/dist/',
      '**/build/',
      '**/.next/',
      '**/temp/',
      '**/coverage/',
      '**/.vercel/',
      '**/node_modules/',
      // Generated files
      '**/next-env.d.ts',
      '**/auto-imports.d.ts',
      '**/components.d.ts',
      // Config files that don't need linting
      '**/vite.config.*',
      '**/vitest.config.*',
      '**/playwright.config.*',
    ],
  },

  // Backend specific rules (NestJS)
  {
    files: ['apps/backend/**/*.ts'],
    rules: {
      // Type imports - allow any style for backend
      'ts/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',

      // Node.js specific
      'node/prefer-global/process': ['error', 'always'],
      'node/prefer-global/buffer': ['error', 'always'],
      'node/prefer-global/console': ['error', 'always'],

      // NestJS decorators and DI patterns
      'ts/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      'ts/no-explicit-any': 'warn',

      // Allow some patterns common in NestJS
      'ts/no-empty-interface': 'off',
      'ts/ban-types': 'off',

      // Disable React-specific rules for backend
      'react-hooks-extra/no-unnecessary-use-prefix': 'off',

      // Allow console in backend
      'no-console': 'off',
    },
  },

  // Frontend specific rules (React/Next.js)
  {
    files: ['apps/frontend/**/*.ts', 'apps/frontend/**/*.tsx'],
    rules: {
      // Type imports - prefer consistency but not strict
      'ts/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',

      // Disable Node.js globals for frontend
      'node/prefer-global/process': 'off',
      'node/prefer-global/buffer': 'off',

      // React specific optimizations
      'react/no-unescaped-entities': 'off',
      'react/display-name': 'off',
      'react/no-context-provider': 'off', // Allow React 19 syntax
      'react/no-clone-element': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Performance and best practices
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks-extra/no-direct-set-state-in-use-effect': 'warn',

      // TypeScript
      'ts/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      'ts/no-explicit-any': 'warn',

      // Console usage - only allow warn and error
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Shared package rules
  {
    files: ['packages/**/*.ts'],
    rules: {
      'ts/consistent-type-imports': 'warn',
      'ts/no-unused-vars': 'warn',
      'ts/no-explicit-any': 'warn',
      'no-console': 'warn',
    },
  },

  // Test files
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'ts/no-explicit-any': 'off',
      'no-console': 'off',
      'ts/no-unused-vars': 'off',
    },
  },

  // Configuration files
  {
    files: ['*.config.{js,ts,mjs}', '*.d.ts'],
    rules: {
      'ts/no-explicit-any': 'off',
      'no-console': 'off',
      'import/no-default-export': 'off',
    },
  },
)
