/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
module.exports = {
  plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
  printWidth: 110,
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
