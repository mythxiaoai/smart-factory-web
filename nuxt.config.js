export default {
  ssr:false,
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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './assets/imgs/favicon.ico' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['ant-design-vue/dist/antd.css', './assets/less/index.less','./assets/less/ant.less'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    //三方插件 注意引入顺序
    '@/plugins/antd-ui.js',
    '@/plugins/vue-ls.js',
    '@/plugins/util.js',
    '@/plugins/axios.js',
    '@/plugins/http.js',

    //项目相关
    '@/plugins/app.js'
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
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/rjgf/api/': {
      //target: 'http://192.168.110.241:9122/',//测试
      target: 'http://192.168.110.241:9001/',//开发
      //target: 'http://113.108.148.245:9594/',
      //target: 'http://192.168.110.240:9200/mock/122/',
      changeOrigin: true,
      secure: false,
      xfwd:true,
      pathRewrite: {}
    }
  },
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
    hardSource: true,
    friendlyErrors: false,
    extend(config, { isClient, loaders }) {
      loaders.less.javascriptEnabled = true
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
    middleware: ['auth']
  },
  server: {
    host: '0.0.0.0',
    timing: {
      total: true
    }
  }
}
