module.exports = {
    printWidth: 80,
    tabWidth: 4,
    trailingComma: 'all',
    singleQuote: true,
    semi: true,
    importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
    importOrderBuiltinModulesToTop: true,
    importOrderCaseInsensitive: true,
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderMergeDuplicateImports: true,
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
