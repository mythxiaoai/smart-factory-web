
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
    return /\((.*)\)[.*]*\{(.*)\}$/gim.test(str)
  }

  
//简单数据变成父子结构数据  忽略大小写

function convert(list) {
  const res = []
  const map = list.reduce((res, v) => (res[v.id] = v, res), {});
  for (const item of list) {
      if (item.parentId === null) {
          res.push(item)
          continue
      }
      if (item.parentId in map) {
        //在map中找出父
          const parent = map[item.parentId]
          //添加子
          parent.children = parent.children || []
          parent.children.push(item)
      }
  }
  return res
}

function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

module.exports={
  convert,
  timeFix
}
