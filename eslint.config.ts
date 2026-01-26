import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,
  {
    rules: {
      semi: [2, 'always'], // 强制语句分号结尾
      'no-extra-semi': 2, //不允许出现不必要的分号
      'no-regex-spaces': 2, //正则表达式中不允许出现多个连续空格
      'valid-jsdoc': [
        'error',
        {
          requireReturn: false,
          requireParamDescription: false,
          requireReturnDescription: true,
        },
      ], //强制JSDoc注释
    },
  },
)
