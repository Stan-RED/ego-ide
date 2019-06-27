const path = require("path");

module.exports = {
  overrideWebpackConfig: ({
    webpackConfig,
    cracoConfig,
    pluginOptions,
    context: { env, paths }
  }) => {
    const oneOfTsLoaderRule = getOneOfTsLoaderRule(webpackConfig);

    // Let's compile *.ts in parent also.
    oneOfTsLoaderRule.include = [oneOfTsLoaderRule.include, path.resolve("..")];

    return webpackConfig;
  }
};

/**
 * @returns Next part of webpack config:
 * // Compile .tsx?
 * {
 *   test: /\.(ts|tsx)$/,
 *   include: paths.appSrc,
 *   use: [
 *     {
 *       loader: require.resolve('ts-loader'),
 *       options: {
 *         // disable type checker - we will use it in fork plugin
 *         transpileOnly: true,
 *       },
 *     },
 *   ],
 * }
 */
function getOneOfTsLoaderRule(webpackConfig) {
  const oneOfIdx = webpackConfig.module.rules.findIndex(
    item => "oneOf" in item
  );

  const oneOf = webpackConfig.module.rules[oneOfIdx].oneOf;

  const tsLoaderIdx = oneOf.findIndex(
    item =>
      "use" in item &&
      item.use.length === 1 &&
      "loader" in item.use[0] &&
      item.use[0].loader.indexOf("ts-loader") !== -1
  );

  return oneOf[tsLoaderIdx];
}
