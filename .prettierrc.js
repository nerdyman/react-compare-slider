/** @type {import('prettier').Options} */
module.exports = {
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
  printWidth: 100,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  useTabs: false,

  importOrder: ['^~/(.*)$', '^[./]'],
  importOrderBuiltinModulesToTop: true,
  importOrderCombineTypeAndValueImports: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
