module.exports={
    //登陆
    applicationInfo(params){
        return this.$http.$post('/system/open/clientInfo', params);
    },
    //用户信息
    userInfo(params){
        return this.$http.$get(`/system/userInfo`, params);
    },
    //权限
    currentUserPermission(params){
        return this.$http.$get(`/system/currentUserPermission`, params);
    },
    //字典
    getAlldict(params){
        return this.$http.$get(`/system/getAlldict`, params);
    }
}