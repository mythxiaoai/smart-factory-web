export default {
    //登陆
    async login(params){
        return await this.$axios.$post('/system/captchaLogin', params);
    },
    //退出登陆
    async loginout(params){
        return await this.$axios.$get('/login-out', params);
    },
    //验证码
    async verify(params){
        return await this.$axios.$get(`/system/open/randomImage`, {params});
    }
}