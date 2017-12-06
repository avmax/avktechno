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
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-console': 'off',
    'no-return-assign': 'off',
    'object-shorthand': 'off',
  },
  globals: {}
};

