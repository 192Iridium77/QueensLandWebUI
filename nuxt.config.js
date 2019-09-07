// import VuetifyLoaderPlugin from "vuetify-loader/lib/plugin";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ type: "text/javascript", src: "/settings.js" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  // css: [{src: "vuetify/dist/vuetify.min.css", lang: "scss"}],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vue-tree-list.js", mode: "client", ssr: false },
    // { src: "~/plugins/vue-carousel.js", mode: "client", ssr: false },
    { src: "~/plugins/axios" }
    // {src: "~/plugins/vuetify.js"}
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/vuetify", "@nuxtjs/axios"],
  // vuetify: {
  //   theme: {}
  // },
  /*
   ** Build configuration
   */
  build: {
    // loaders: {
    //   scss: {
    //     implementation: sass
    //   }
    // },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};