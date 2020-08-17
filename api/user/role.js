module.exports={
    //登陆
    async getRole(params){
        console.log(this);
        return await this.$axios.$post('/login', params);
    }
}