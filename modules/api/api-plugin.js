
  import api from "@/api/index.js"
  
  
  export default function(content,inject) {
    (function changeFnthis(value,key=null,preObj=null){
      //递归
      if(typeof value ==="object"){
        for (const key in value) {
          changeFnthis(value[key],key,value);
        }
      }
      if (typeof value === "function") {
        //字符串方法还原方法 因为剪头函数无法bind this
        //创建异步方法
        preObj[key] = preObj[key].bind(content);
      }
     
    })(api)

     // 注入$api
   inject('api', api)
  }
