
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
  