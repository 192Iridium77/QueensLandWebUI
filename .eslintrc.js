const ignore = 0;
const warn = 1;

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/essential',
    'problems',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: ['vue', 'import'],
  rules: {
    'no-use-before-define': 0,
    'prefer-const': 1,
    'no-extra-semi': 1,
    'no-unused-vars': ignore,
    'object-shorthand': 1,
    'no-var': 1,
    'no-undef': 1,
    'no-useless-escape': 1,
    'no-dupe-keys': 1,
    eqeqeq: 1,
    'prefer-template': 1,
    'prefer-arrow-callback': 1,
    'import/no-deprecated': 1,
    'import/no-unresolved': 1,
    'vue/require-v-for-key': ignore,
    'no-console': ignore
    // 'deprecate-svelte/import': [
    //   1,
    //   {
    //     name: '/test/unit/component/stubs.js',
    //     use: '{ componentStubs } from test/unit/component/utils'
    //   }
    // ]
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.vue']
    }
  ],
  globals: {
    __BASE_URL: false,
    $: false, // TODO: Import where needed and put in vendors if we still need it.
    $nuxt: false
  },
  settings: {
    'import/resolver': {
      // nuxt: {
      //   nuxtSrcDir: "nuxt",
      //   extensions: [".js", ".vue"]
      // },
      node: {
        extensions: ['.js', '.vue']
      },
      webpack: {
        config: {
          resolve: {
            extensions: ['.js', '.vue'],
            alias: {
              '~': __dirname,
              '@shared': '../api/shared'
            }
          }
        }
      }
    }
  }
};
