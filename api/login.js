module.exports={
    //登陆
    async login(params){
        return await this.$axios.$patch('/login', params);
    },
    //退出登陆
    async loginout(params){
        return await this.$axios.$get('/login', params);
    }
}