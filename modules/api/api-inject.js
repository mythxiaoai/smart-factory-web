const path = require('path')

const relativePath = path.join('./../../api/')
const url = path.join(__dirname, relativePath)

export default function() {
  this.addPlugin({
    src: path.resolve(__dirname, 'api-plugin.js')
  })
  //添加热更新
  this.options.watch.push(`${url}`)
}
