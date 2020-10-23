module.exports={
    //登陆
    async applicationInfo(params){
        return await this.$axios.$post('/system/open/clientInfo', params);
    }
}