process.env[`ESLINT_USE_FLAT_CONFIG`] = `true`;
process.argv.push(`--config`, `./eslint.config.mjs`);
require('./node_modules/eslint/bin/eslint')
