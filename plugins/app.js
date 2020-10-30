import {deviceEnquire} from "~/assets/utils/device.js"
//
/**
 * 初始化系统配置信息
 * 1.初始化app.js
 */

export default ({store}, inject) => {
    //设备初始化
    deviceEnquire(type=>{
        store.commit("app/setDevice",type);
    })
};

