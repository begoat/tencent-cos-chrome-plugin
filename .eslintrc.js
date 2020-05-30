const path = require('path');

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    quotes: [ERROR, 'single'], // 引号类型
    semi: [ERROR, 'always'], // 语句强制分号结尾
    'space-infix-ops': ERROR, // 中缀操作符周围要不要有空格
    'no-param-reassign': OFF, // 不允许对函数的形参进行赋值
    'prefer-spread': ERROR, // 首选展开运算
    'comma-dangle': OFF, // 不允许或强制在对象字面量或者数组属性的结尾使用逗号
    'padded-blocks': OFF, // 规定代码块前后是否要加空行
    'prefer-const': OFF,
    'no-multi-spaces': ERROR,
    'no-var': OFF,
    'one-var': OFF,
    'class-methods-use-this': WARNING,
    'no-unused-expressions': [ERROR, { allowShortCircuit: true }], // 允许使用断路 和三目运算
    'no-mixed-operators': OFF,
    '@typescript-eslint/no-explicit-any': OFF, // 允许使用 any
    'react-hooks/rules-of-hooks': ERROR, // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': WARNING, // 检查 effect 的依赖
    'no-unused-expressions': OFF,
    '@typescript-eslint/no-unused-expressions': [ERROR, { allowShortCircuit: true }],
    '@typescript-eslint/ban-ts-ignore': WARNING
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './webpack.config.js')
      },
      typescript: {}
    }
  }
};