module.exports = {
  publicPath: "./",
  transpileDependencies: [
    'vuetify'
  ],
    pwa: {
      themeColor: "#f66c1f",
      msTileColor: "#f66c1f",
      appleMobileWebAppCache: "yes",
      workboxOptions: {
        exclude: [/_redirects/]
      }
    }
}
