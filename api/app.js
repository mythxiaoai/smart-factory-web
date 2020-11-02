module.exports={
    //登陆
    async applicationInfo(params){
        return await this.$http.$post('/system/open/clientInfo', params);
    }
}