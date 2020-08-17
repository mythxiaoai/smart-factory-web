
  export default function(content,inject) {
     let apiConf = <%= options.apiConfStr %>;

    (function changeFnthis(value,key=null,preObj=null){
        //递归
        if(value&&typeof value ==="object"){
          for (const key in value) {
            changeFnthis(value[key],key,value);
          }
        }
        if (value&&isFunctionStr(value)) {
          //字符串方法还原方法 因为剪头函数无法bind this
          //创建异步方法
          let fn = eval(`(async function(${RegExp.$1}){${RegExp.$2}})`);
          //绑定上下文
          preObj[key] = fn.bind(content);
        }
       
      })(apiConf)

      //注入$api
      inject('api', apiConf)
      //content.app.$api = apiConf;
  }

  function parse(obj) {
    return JSON.parse(obj, (key, value) => {
      if (isFunctionStr(value)) {
        return new Function('return ' + RegExp.$1)
      }
      return value;
    })
  }
  
  function isFunctionStr(str) {
    return /\((.*)\)[.*]*\{(.*)\}$/gim.test(str)
  }