module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'no-confusing-arrow': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'func-names': 'off',
    'space-before-function-paren': 'off',
    'no-return-assign': 'off',
    'object-shorthand': 'off',
    'no-unused-vars': 1,
  },
  globals: {}
};
