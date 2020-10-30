import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
//工具插件  需要挂载在原型链等都在这里挂载


import TablePage from '@/components/common/TablePage.vue'
Vue.component('table-page',TablePage)


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


/**
 * val 参数  是任意类型
 * 作用:form表单清空   所有对象   支持深层！
 */
function fromReset(val) {
	if (typeof val == "string") {
		val = "";
	} else if (typeof val == "object") {
		if (Array.isArray(val)) {
			val = [];
		} else if (val == null) {
			val = null;
		} else {
			for (var key in val) {
				if (val.hasOwnProperty(key)) {
					val[key] = fromReset(val[key])
				}
			}
		}
	} else if (typeof val == "boolean") {
		val = false;
	} else if (typeof val == "number") {
		val = 0;
	} else {
		val = "";
	}
	return val
}

export default (content, inject) => {
    //常用插件注册
    //moment注册
    inject("time", str => {
        return moment(str);
    });
    //lodash注册
      inject("_", _);
      //工具类
      inject("utils", {
        fromReset
      });
};