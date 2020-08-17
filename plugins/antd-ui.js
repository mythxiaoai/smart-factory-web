import Vue from 'vue'
import Antd from 'ant-design-vue/lib'
import {Modal,message,notification} from 'ant-design-vue'

//注册
Vue.use(Antd)
//挂载vue全局
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning

//message设置 只存在一个 持续时间为2s 默认为3s
message.config({
    maxCount: 1,
    duration: 2,
});