/*
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-24 15:27:13
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-27 18:56:33
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-prototype-builtins ': 'off'
  }
}
