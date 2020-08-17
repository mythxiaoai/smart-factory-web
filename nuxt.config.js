import baseURL from "./assets/config/base.js";
export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.css',"./assets/less/index.less"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    //三方插件 注意引入顺序
    '@/plugins/antd-ui.js',
    '@/plugins/vue-ls.js',
    '@/plugins/util.js',
    '@/plugins/axios.js',
    
    //项目相关
    '@/plugins/app.js',

  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '~/modules/api/api-inject.js',
  ],
  // axios: {
  //   proxy: true
  // },
  // proxy: {
  //   '/api': {
  //     target: baseURL,
  //     pathRewrite:{
  //       changeOrigin:true
  //     }
  //   }
  // },
  styleResources: {
    scss: './assets/variables.scss',
    less: ['./assets/**/*.less']
    // sass: ...
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    hardSource:true,
    friendlyErrors:false,
    extend(config, { isClient, loaders}) {
      loaders.less.javascriptEnabled =true;
      if (isClient) {
        // console.log(config.module.rules[2]);
        //     config.module.rules[2] = {
        //       test: /\.js$/,
        //           use: {
        //               loader: "babel-loader",
        //                   options: {
        //                       presets: ["@babel/preset-env"]
        //                   }
        //           }
        //   }
      }
    }
  },
  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push()
    }
  },
  server: {
    timing: {
      total: true
    }
  }
}