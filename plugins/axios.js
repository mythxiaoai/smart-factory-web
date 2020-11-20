import { messageArr } from '@/assets/utils/errorTip.js'
import { notification, message } from 'ant-design-vue'
import { baseURL, LONGINPATH } from '@/assets/config/appConfig.js'

/**
 * 要求后端拦截所有异常报错  返回json交由前端处理
 * 返回数据结构为  请详细阅读
 * {
 * code:请求状态码  对应的http状态码  对应的返回提示 请看./layouts/errorTip.js
 * message：返回提示信息  注意请求方式为get时候默认不弹框 需要自己手动弹框 其他请求会默认读取后端返回的message信息 如果为空默认谈“操作成功”
 * data：返回数据格式
 * }
 * 
 * 特别注意点：自定义状态code
 * code 为1001为业务异常
 * code 为1002登陆失效
 * 其他转发http的状态码就行
 * 
 * 反馈
 * 业务操作成功和业务性错误1001错误用message级别提示
 * 其他 登陆失效 和其他系统异常用notification级别
 * 
 * 
 * response规范：
 * Boolean类型
 * 用数字0和1来表示  1为ture 为false 前端0默认为fouse
 * 日期类型
 * 返回字符串形式的日期
 * 
 * 分页：
 * 请求参数
 * pageNo
 * pageSize
 * 响应：
 * {
 * code:200,
 * message:"",
 *  data:{
 *      pageTotal:总页数
 *      list:[{}]
 *  }
 * }

 * 
 */

function axiosFn(content, inject) {
  let { $axios, store, error } = content
  //baseURL
  $axios.defaults.baseURL = baseURL
  //超时
  //$axios.defaults.timeout = 6000
  //拦截器
  $axios.onRequest((config) => {
    //如果data中有$msg="none"的值则请求成功不弹框
    if (config.data?.$msg == 'none') {
      config.headers['x-msg'] = 'none'
    }
    if (store.getters['security/isLogin']) {
      config.headers.Authorization = 'Bearer ' + store.state.security.token
    }
    return config
  })
  //返回
  /*
  response
  */
  $axios.onResponse((response) => {
    //config data headers request
    let type = 'success'
    let url = response.config.url
    let isMsg = isPopMsg(response) //成功是否弹框  根据请求方式和请求头共同判断
    let { code, message } = response.data
    //赋值默认值
    message = message || messageArr[code]
    if (code >= 200 && code < 300) {
      isMsg && runMessage({ type, message })
      response.data = response.data
      return response
    }
    type = 'error'
    //业务异常
    if (code == 1001) {
      runMessage({ type, message })
      return response
    }
    //登陆失效
    if (code === 1002) {
      runNotification({ type, code, url, message })
      store.commit('security/celar');
      if (window.location.pathname != LONGINPATH) {
        window.location.href = `${window.location.origin +
          LONGINPATH}?redirect=${window.location.pathname}`
      }
      return response
    }
    //其他异常
    runNotification({ type, code, url, message })
    return response
  })
  //错误
  $axios.onError((err) => {
    //["config", "request", "response", "isAxiosError", "toJSON"]
    console.error(err)
    err = err.toJSON()
    return errorPage({ statusCode: err.code, message: err.message }, err)
  })
}

//页面级错误
function errorPage(errData, error) {
  error(errData)
  return Promise.reject(error)
}
//错误对话弹框
function runNotification(obj) {
  notification[obj.type]({
    message: obj.code + ' 错误:' + obj.url,
    description: obj.message
  })
}
//操作提示弹框
function runMessage(obj) {
  //销毁 让它只存在一个
  message.destroy()
  message[obj.type](obj.message)
}
//是否弹框  当请求方法为get或者请求头中没有限制msg不弹 则默认弹框
function isPopMsg(response) {
  let method = response.config.method
  let message = response.config.headers['x-msg']
  if (method === 'get' || message == 'none') {
    response.config.headers['x-msg'] = null
    return false
  }
  return true
}

export default axiosFn
