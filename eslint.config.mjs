// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config(tseslint.configs.strict, tseslint.configs.stylistic, {
  rules: {
    'no-console': 'warn',
    // 'brace-style': ['error', 'stroustrup'],
  },
});
