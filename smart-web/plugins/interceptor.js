export default function({ $axios, store }) {
    //拦截器
    // 为$axios实例添加一个请求事件监听
    // onRequest是nuxtjs/axios模块提供的帮助方法
    $axios.onRequest(config => {
      if (store.state.user.token) {
        config.headers.Authorization = "Bearer " + store.state.user.token;
      }
      return config;
    });
  }