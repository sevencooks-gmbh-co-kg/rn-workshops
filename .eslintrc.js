module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/consistent-type-imports': 2,
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react-native/no-unused-styles': 2,
    'no-console': 2,
    camelcase: 2,
    'prefer-destructuring': 2,
    'no-nested-ternary': 2,
  },
}
