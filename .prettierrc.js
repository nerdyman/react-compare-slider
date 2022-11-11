/** @type {import('prettier').Options} */
module.exports = {
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
  printWidth: 90,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,

  importOrder: ['^~/(.*)$', '^[./]'],
  importOrderBuiltinModulesToTop: true,
  importOrderCombineTypeAndValueImports: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
