import baseURL from '@/assets/config/base.js'
import { messages } from '@/assets/utils/errorTip.js'
import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'

/**
 * 要求后端拦截所有异常报错  返回json交由前端处理
 * 返回数据结构为  请详细阅读
 * {
 * code:请求状态码  对应的http状态码  对应的返回提示 请看./layouts/errorTip.js
 * msg：返回提示信息  注意请求方式为get时候默认不弹框 需要自己手动弹框 其他请求会默认读取后端返回的message信息 如果为空默认谈“操作成功”
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
 * msg:"",
 *  data:{
 *      pageTotal:总页数
 *      list:[{}]
 *  }
 * }

 * 
 */
function axiosFn({ $axios, store, error }) {
  //baseURL
  $axios.defaults.baseURL = baseURL;
  //超时
  $axios.defaults.timeout = 6000
  //拦截器
  $axios.onRequest((config) => {
    
    //如果data中有msg="none"的值则请求成功不弹框
    if (config.data&&config.data.msg == 'none') {
      config.headers['x-msg']='none';
    }
    if (store.state.security.token) {
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
    console.log(response.config)

    let type = 'success';
    let url = response.config.url
    let isMsg = isPopMsg(response) //成功是否弹框  根据请求方式和请求头共同判断
    let { code, msg } = response.data
    //赋值默认值
    msg = msg || messages[code];

    if (code >= 200 && code < 300) {
      isMsg && runMessage({ type, msg });
      return response;
    }
    type = 'error'
    //登陆失效
    if (code === 1002) {
      store.dispatch('security/loginout')
      runNotification({ type, code, url, msg });
      return response;
    }
    //业务异常
    if (code == 1001) {
      runMessage({ type, msg });
      return response;
    }
    //其他异常
    runNotification({ type, code, url, msg })
    return response
  })
  //错误
  $axios.onError((err) => {
    //["config", "request", "response", "isAxiosError", "toJSON"]
    console.error(err)
    err = err.toJSON()
    return errorPage({ statusCode: err.code, message: err.message }, error)
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
    description: obj.msg
  })
}
//操作提示弹框
function runMessage(obj) {
  //销毁 让它只存在一个
  message.destroy()
  message[obj.type](obj.msg)
}
//是否弹框  当请求方法为get或者请求头中没有限制msg不弹 则默认弹框
function isPopMsg(response) {
  let method = response.config.method
  let msg = response.config.headers["x-msg"];
  if (method === 'get'||msg=="none") {
    response.config.headers["x-msg"]=null;
    return false
  }
  return true
}

export default axiosFn
