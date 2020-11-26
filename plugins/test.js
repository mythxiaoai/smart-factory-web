// function proxyMethod(callback,url=""){
//     const methods = ["get"," delete"," post","put","patch"];
//     let fn = function(){
//         return new Proxy(
//             {},
//             {
//               get: (target, key) => {
//                 if(methods.includes(key)){
//                    return (params={},options={})=>{
//                     return callback && callback.call(null,{
//                         url,
//                         method:key,
//                         params,
//                         options
//                     })
//                    };
//                 }else{
//                     url+=`/${key}`;
//                     return fn(callback,url);
//                 }
//               }
//             }
//         )
//     }
//     return fn(callback,url)
// }


// let callback = function(obj){
    
// }
// const api = proxyMethod(callback);

// //
// api.sys.user.list.get({data:1},{set:333});
const methods = ['get', 'delete', 'post', 'put', 'patch']
  //传data的方法
  const http = new Proxy({},{
    get:(target,key)=>{
      if(!methods.includes(key)){
        new Error( "必须含有'get', 'delete', 'post', 'put', 'patch'");
        return ;
      }
      return ;
    }
  });

  console.log(http.a);

