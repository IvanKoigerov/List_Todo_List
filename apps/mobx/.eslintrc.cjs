module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
  },
  extends: ['plugin:@web-bee-ru/react'],
};