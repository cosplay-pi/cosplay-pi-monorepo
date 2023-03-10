import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginTypescriptFormatter from 'eslint-plugin-typescript-formatter';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginImportNewlines from 'eslint-plugin-import-newlines';
import eslintPluginReact from 'eslint-plugin-react';

export default [
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
    ],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: [
          './tsconfig.json',
        ],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      'typescript-formatter': eslintPluginTypescriptFormatter,
      'import': eslintPluginImport,
      'import-newlines': eslintPluginImportNewlines,
      'react': eslintPluginReact,
    },
    settings: {
      'import/internal-regex': '(^cosplay-pi)|(^@prisma/client)',
    },
    rules: {
      'typescript-formatter/format': [
        'warn',
        {
          baseIndentSize: 0,
          indentSize: 2,
          tabSize: 2,
          newLineCharacter: '\n',
          convertTabsToSpaces: true,
          indentStyle: 2,
          trimTrailingWhitespace: true,
          insertSpaceAfterCommaDelimiter: true,
          insertSpaceAfterSemicolonInForStatements: true,
          insertSpaceBeforeAndAfterBinaryOperators: true,
          insertSpaceAfterConstructor: false,
          insertSpaceAfterKeywordsInControlFlowStatements: true,
          insertSpaceAfterFunctionKeywordForAnonymousFunctions: false,
          insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
          insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
          insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
          insertSpaceAfterOpeningAndBeforeClosingEmptyBraces: false,
          insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
          insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces: false,
          insertSpaceAfterTypeAssertion: false,
          insertSpaceBeforeFunctionParenthesis: false,
          placeOpenBraceOnNewLineForFunctions: false,
          placeOpenBraceOnNewLineForControlBlocks: false,
          insertSpaceBeforeTypeAnnotation: false,
          indentMultiLineObjectLiteralBeginningOnBlankLine: false,
          semicolons: 'insert',
        },
      ],
      'quotes': [
        'warn',
        'backtick',
      ],
      'no-duplicate-imports': [
        'warn',
        {
          includeExports: true,
        }
      ],
      'no-import-assign': [
        'warn',
      ],
      'no-useless-rename': [
        'warn',
      ],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
        },
      ],
      'import/no-extraneous-dependencies': [
        'warn',
      ],
      'import/no-mutable-exports': [
        'warn',
      ],
      'import/extensions': [
        'warn',
        'never',
      ],
      'import/order': [
        'warn',
        {
          alphabetize: {
            order: 'asc',
          },
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
            'unknown',
          ],
          'newlines-between': 'always',
        }
      ],
      'import-newlines/enforce': [
        'warn',
        {
          items: 1,
        },
      ],
      'comma-dangle': [
        'warn',
        'always-multiline',
      ],
      'indent': [
        'warn',
        2,
      ],
      'eol-last': [
        'warn',
        'always',
      ],
      '@typescript-eslint/semi': [
        'warn',
        'always',
      ],
      'react/jsx-wrap-multilines': [
        'warn',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        }
      ],
      'react/jsx-closing-bracket-location': [
        'warn',
        'tag-aligned',
      ],
      'react/jsx-newline': [
        'warn',
        {
          prevent: true,
        },
      ],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          ignoreCase: true,
          shorthandFirst: true,
          shorthandLast: false,
          multiline: 'ignore',
          noSortAlphabetically: true,
          reservedFirst: true,
        },
      ],
    },
  }
];
