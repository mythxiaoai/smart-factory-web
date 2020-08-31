
  export default function(content,inject) {
     let filePaths = <%= options.filePaths %>;
    console.log(filePaths);
    
    let a = import("@/assets/a.js");
    console.log(a);
      //注入$api
      inject('api', filePaths)
      //content.app.$api = apiConf;
  }


