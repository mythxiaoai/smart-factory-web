import Vue from 'vue'
import { LONGINPATH, HOMEPATH } from '@/assets/config/appConfig.js'
import {messageArr,imgs} from '@/assets/utils/errorTip.js';
import { notification, message } from 'ant-design-vue'

const whiteRoute = ['/login'] //不转发的白名单路由
const testPrefix = "/test";
export default function(content) {
  const fromRoute = content.from;
  //路由获取
  const route = content.route;
  //路由实例
  const router = content.app.router;
  const isLogin = !!Vue.ls.get('token');
  let menu = Vue.ls.get('permission');

  //白名单
  if(~whiteRoute.indexOf(route.path)||route.path.slice(0,4)===testPrefix){
    content.next();
    return;
  }

  //是否登陆
  if(isLogin){
    //过滤出是子节点的url
    menu = menu.menu.filter(v=>v.leafFlag==1).map(v=>v.url);
    //是否授权
    if(~menu.indexOf(route.path)){
      content.next();
    }else{
      //当前路径是否有对应的组件就可以判断是否在全局菜单内
      console.log(route.path,router.getMatchedComponents(route.path));
      if(router.getMatchedComponents(route.path).length>0){
        //403
        content.error({statusCode:403,message:messageArr[403]});
        content.next();
      }else{
        //404
        content.error({statusCode:404,message:messageArr[404]});
        content.next();
      }
    }
  }else{
    //如果没有登陆跳登陆  带上当前的path作为登录后的跳转
      notification.warning({
        message: "提示",
        description: "请先登陆后访问~"
      });

    router.push({ path: LONGINPATH, query: { redirect: route.path } });
  }

}
