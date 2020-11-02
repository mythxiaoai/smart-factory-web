module.exports={
    //list
     list(params){
        return  this.$http.$get('/system/sys/permission/list', params);
    },
}