const compileLocalPackagesWebpackConfigPlugin = require("./craco-plugin-compile-local-packages");

module.exports = {
  plugins: [
    {
      options: { preText: "Will compile *.ts files in local packages" },
      plugin: compileLocalPackagesWebpackConfigPlugin
    }
  ]
};
