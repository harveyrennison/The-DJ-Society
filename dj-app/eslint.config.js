import js from '@eslint/js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // 1. Global Ignores
  globalIgnores(['dist']),
  
  // 2. Base ESLint Recommended Rules
  js.configs.recommended,
  // REMOVED: reactHooks.configs.recommended, // <-- Removed the object that caused the conflict

  // 3. TypeScript/React Configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        // Use the comprehensive ESLint config file
        project: './tsconfig.eslint.json' 
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      // The plugin is correctly defined as an object property here:
      'react-hooks': reactHooks, // Note the use of the quoted key for consistency
      reactRefresh: reactRefresh,
    },
    rules: {
      quotes: ['error', 'single'],

      // Turn off base ESLint rule for unused variables
      'no-unused-vars': 'off',
      // Use the TypeScript-aware rule
      '@typescript-eslint/no-unused-vars': [
        'warn', 
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      
      // Add recommended rules for TypeScript
      ...tsPlugin.configs['recommended-type-checked'].rules,
      
      // Manually define the essential React Hooks rules (Replaces the spread line)
      'react-hooks/rules-of-hooks': 'error', // Checks if hooks are used correctly
      'react-hooks/exhaustive-deps': 'warn',  // Checks dependency array
      
      // Rule for React Fast Refresh in dev mode
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
])