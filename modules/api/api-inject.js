const glob = require('glob-all')
const path = require('path')
const fs = require('fs')
const parser = require("@babel/parser");
const { transformFromAst } = require("@babel/core");
const relativePath = path.join('./../../api/')
const url = path.join(__dirname, relativePath)
const chokidar = require('chokidar')

export default function() {
  var files = glob.sync([
    `${url}/**/*.js` //include all     files/
  ])
  //路径处理
  let filePaths = files.map(filePath=>{
    let fileName = filePath.replace(/.*api\/([\w\s/]+.js)$/gim, '$1');
    return path.join('@/api/' ,fileName);
  })
  console.log(filePaths);
   //格式化
   filePaths = JSON.stringify(filePaths);
  //添加插件
  this.addPlugin({
    src: path.resolve(__dirname, 'api-plugin.js'),
    options: { filePaths }
  })
  //添加热更新
  this.options.watch.push(`${url}`);
}

//路径转对象
function pathToObject(url) {
  var files = glob.sync([
    `${url}/**/*.js` //include all     files/
  ])
  let apiConf = {}
  files.forEach((filePath) => {
    //讲目录转化成对象点
    let fileName = filePath.replace(/.*api\/([\w\s/]+).js$/gim, '$1');
    let keyNames = fileName.split('/')
    let len = keyNames.length
    let temp = apiConf;
    keyNames.forEach((key, index) => {
      if (index === len - 1) {
        temp[key] = code
      } else {
        temp[key] = {}
        temp = temp[key]
      }
    })
  })
  //因为json传过去的字符串模板结束的是[Object object] 而普通的stringify方法会过滤掉方法
  return JSON.stringify(apiConf)
}

