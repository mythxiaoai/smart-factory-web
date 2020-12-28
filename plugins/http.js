// axios.request(config)
// axios.get(url[, config])
// axios.delete(url[, config])
// axios.head(url[, config])
// axios.options(url[, config])
// axios.post(url[, data[, config]])
// axios.put(url[, data[, config]])
// axios.patch(url[, data[, config]])

/**
 * 插件目的：优化resful风格的参数 保证相同输入，减少脑力成本,优化api调用
 * $api    调用方式   this.$api.user.list.get(parms,options)---->  url = /user/list   get为请求方法
 */

export default ({$axios}, inject) => {
  //全方法
  const methods = ['get', 'delete', 'post', 'put', 'patch']
  //传data的方法
  let dataArr = ['delete', 'post', 'put', 'patch']
  //传paarms的方法
  let paramsArr = ['get']
  /**
返回事例
{
  url: '/sys/user/list',
  method: 'get',
  params: { data: 1 },
  options: { set: 333 }
}
 */
  let cb = function(obj) {
    //参数处理
    obj.data = dataArr.includes(obj.method) && obj.params;
    obj.params = paramsArr.includes(obj.method) && obj.params;
    //优先用用户传进来的options
    let opts = Object.assign({}, obj, obj.options);
    return $axios.$request(opts)
  }

  //全路径当做url匹配  
  const api = proxyMethod(cb);
  //方法匹配  $http.get("url",{})
  const http = new Proxy({},{
    get:(target,key)=>{
      if(!methods.includes(key)){
        console.error( "http的调用方法只限制 'get', 'delete', 'post', 'put', 'patch'");
        return {};
      }
      return (url, params,options={})=>{
        //参数处理
        options.url = url;
        options.method = key;
        options.data = dataArr.includes(key) && params;
        options.params = paramsArr.includes(key) && params;
        return $axios.$request(options)
      };
    }
  });
 
  inject('api', api)
  inject('http', http)
}


function proxyMethod(callback, urlPath = '') {
  const methods = ['get', 'delete', 'post', 'put', 'patch']
  let fn = function() {
    return new Proxy(
      {},
      {
        get: (target, key) => {
          if (methods.includes(key)) {
            //每次调用完后url清空
            let url = urlPath;
            urlPath = '';
            return (params = {}, options = {}) => {
              return (
                callback &&
                callback.call(null, {
                  url,
                  method: key,
                  params,
                  options
                })
              )
            
            }
          } else {
            urlPath += `/${key}`
            return fn(callback, urlPath)
          }
        }
      }
    )
  }
   return fn(callback, urlPath)
}
