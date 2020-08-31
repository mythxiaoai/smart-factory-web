import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


/*vue 过滤器注册 */
Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('time', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

export default (content, inject) => {
    //常用插件注册
    //moment注册
    inject("time", str => {
        return moment(str);
    });
    //lodash注册
    content.$_=_;
    content.app.$_=_;
};