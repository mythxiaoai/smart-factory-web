const glob = require('glob-all')
const path = require('path')
const relativePath = path.join('./../../api/')
const url = path.join(__dirname, relativePath)
const chokidar = require('chokidar')

export default function() {
    //路径转对象
  let apiConfStr = pathToObject(url);
  //添加插件
  this.addPlugin({
    src: path.resolve(__dirname, 'api-plugin.js'),
    options: { apiConfStr }
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
    //user/role
    let fileName = filePath.replace(/.*api\/([\w\s/]+).js$/gim, '$1')
    let value = require(relativePath + fileName + '.js')
    let keyNames = fileName.split('/')
    let len = keyNames.length
    let temp = apiConf;
    keyNames.forEach((key, index) => {
      if (index === len - 1) {
        temp[key] = value
      } else {
        temp[key] = {}
        temp = temp[key]
      }
    })
  })
  //因为json传过去的字符串模板结束的是[Object object] 而普通的stringify方法会过滤掉方法
  return stringify(apiConf)
}

function stringify(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      return value.toString().replace(/[\r\n\t]/g, '')
    }
    return value
  })
}

function parse(obj) {
  return JSON.parse(obj, (key, value) => {
    if (isFunctionStr(value)) {
      return new Function('return ' + RegExp.$1)
    }
    return value
  })
}

function isFunctionStr(str) {
  return /\(.*\)[.*]*\{(.*)\}$/gim.test(str)
}
