module.exports={
    //list
    async list(params){
        return await this.$axios.$get('/sys/dict/list', params);
    },
    //退出登陆
    async update(params){
        return await this.$axios.$get('/login-out', params);
    }
}