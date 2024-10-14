import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import eslintPluginMarkdown from 'eslint-plugin-markdown';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  {
    files: ["**/*.md"],
    plugins: {
      eslintPluginMarkdown
    }
  },

  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      'semi': [2, 'always'], // 强制语句分号结尾
      "no-extra-semi": 2, //不允许出现不必要的分号
      "no-regex-spaces": 2, //正则表达式中不允许出现多个连续空格
      "valid-jsdoc": ["error", {
        "requireReturn": false,
        "requireParamDescription": false,
        "requireReturnDescription": true
      }], //强制JSDoc注释
    }
  }
];
