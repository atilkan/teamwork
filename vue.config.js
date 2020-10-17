const path = require("path")

module.exports = {
  devServer: {
    port: 9000,
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@comp": path.resolve(__dirname, "src/components/"),
      },
    },
  },
}
