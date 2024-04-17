const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/base.scss";
          @import "@/assets/styles/vars.scss";
          @import "@/assets/styles/layout.scss";
          @import "@/assets/styles/navHeader.scss";
        `
      }
    }
  }
})
