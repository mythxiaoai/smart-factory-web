import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
//工具插件  需要挂载在原型链等都在这里挂载


import TablePage from '@/components/common/TablePage.vue'
/*全局组件 */
Vue.component('table-page', TablePage)



/*vue 过滤器注册 */
Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('time', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})



/**
 * val 参数  是任意类型
 * 作用:form表单清空   所有对象   支持深层！
 */
function fromReset(val) {
  if (typeof val == 'string') {
    val = ''
  } else if (typeof val == 'object') {
    if (Array.isArray(val)) {
      val = []
    } else if (val == null) {
      val = null
    } else {
      for (var key in val) {
        if (val.hasOwnProperty(key)) {
          val[key] = fromReset(val[key])
        }
      }
    }
  } else if (typeof val == 'boolean') {
    val = false
  } else if (typeof val == 'number') {
    val = 0
  } else {
    val = ''
  }
  return val
}

/**
 * 获取字典表下拉数据
 */
function getDictVal(key) {
  let dict = Vue.ls.get('dict')
  return dict[key] || [];
}


let Type = (function() {
  let Type = {};
  for (let i = 0, type; type = ['Undefined', 'Null', 'Boolean', 'Number', 'String', 'Function', 'Array', 'Object'][i++]; ) {
      (function(type) {
          Type['is' + type] = function(obj) {
              return Object.prototype.toString.call(obj) === '[object ' + type + ']';
          };
      })(type);
  }
  return Type;
})();

// this.$_live_type = Type;

// use: this.getChildComponent(vm, 'xx-xx')
function getChildComponent(vueInstance, componentTag) {
    let component = null;
    let allComp = getAllChildComp(vueInstance);

    let i = allComp.findIndex(function(vm) {
        return ~vm._name.indexOf(componentTag);
    });
    if (i !== -1) {
        component = allComp[i];
    }
    return component;

    function getAllChildComp(instance) {
        let allComp = [], child;
        if (Type.isObject(instance)) {
            child = instance.$children;
        } else if (Type.isArray(instance)) {
            child = instance;
        }
        for (let i = 0; i < child.length; i++) {
            allComp.push(child[i]);
            if (child[i].$children.length > 0) { // 还有孩子
                allComp = allComp.concat(getAllChildComp(child[i].$children))
            };
        }
        return allComp;
    }
};


export default (content, inject) => {
  //常用插件注册
  //moment注册
  inject('time', (str) => {
    return moment(str)
  })
  //lodash注册
  inject('_', _)
  //工具类
  inject('utils', {
    fromReset,
    getChildComponent
  })
  
  /*全局指令 */

  
  //字典 $dict("fsdfds")
  inject('dict', getDictVal)
}
