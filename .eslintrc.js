module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:nuxt/recommended'],
  globals: {
    $nuxt: true,
    importScripts: true,
    firebase: true,
    clients: true,
  },
  plugins: ['html', 'vue', 'prettier'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'object-curly-spacing': [2, 'always'],
    'arrow-parens': [2, 'always'],
    allowEmptyCatch: 0,
    'require-await': 0,
    'no-empty-pattern': 0,
    semi: [2, 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': 0,
    'vue/no-v-html': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-parsing-error': [
      'error',
      {
        'unexpected-character-in-attribute-name': false,
        'unexpected-character-in-unquoted-attribute-value': false,
      },
    ],
  },
};
