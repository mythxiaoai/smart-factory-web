// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])

/**
 * 插件目的：优化resful风格的参数 保证相同输入，减少脑力成本
 * 本来打算覆盖$axios 但是因为同一个名字注册并不会覆盖所以只能呢个用$http
 * 下次版本直接用代理连点的方式发送url的网络请求
 */
export default ({ $axios }, inject) => {
  const funs = {
    $request: (options) => {
      return $axios.$request(options)
    },
    $get: (url, params, options) => {
      return $axios.$get(url, { params, ...options })
    },
    $delete: (url, params, options) => {
      console.log(params);
      return $axios.$request({
        url,
        method: 'DELETE',
        params,
        data:params,
        ...options
      })
    },
    $post: (url, params, options) => {
      return $axios.$post(url, params, options)
    },
    $put: (url, params, options) => {
      return $axios.$put(url, params, options)
    },
    $patch: (url, params, options) => {
      return $axios.$patch(url, params, options)
    }
  }
  const http = new Proxy(
    {},
    {
      get: (target, key) => {
        return funs[key]
      }
    }
  )
  
  inject('http', http)
}
