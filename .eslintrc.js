module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-boolean-value': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/first': ['error', 'DISABLE-absolute-first'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'linebreak-style': 0,
    'react/forbid-prop-types': [1, { forbid: ['any'], checkContextTypes: true, checkChildContextTypes: true }],
    'max-len': ['warn', { code: 150 }],
  },
};
