module.exports = {
  publicPath: "./",
  transpileDependencies: [
    'vuetify'
  ],
    pwa: {
      themeColor: "#42b983",
      msTileColor: "#42b983",
      appleMobileWebAppCache: "yes",
      workboxOptions: {
        exclude: [/_redirects/]
      }
    }
}
