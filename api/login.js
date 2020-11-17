module.exports={
    //登陆
    login(params){
        return this.$http.$post('/system/captchaLogin', params);
    },
    //退出登陆
    loginout(params){
        return this.$http.$post('/system/captchaLogout', params);
    },
    //验证码  get请求需要设置parmas参数
    verify(params){
        return this.$http.$get(`/system/open/randomImage`, params);
    }
    
}