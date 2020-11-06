module.exports={
    //list
     list(params){
        return  this.$http.$get('/system/sys/permission/list', params);
    },
    add(params){
        return  this.$http.$post('/system/sys/permission/add', params);
    },
    del(params){
        return  this.$http.$delete('/system/sys/permission/deleteBatch', params);
    },
    edit(params){
        return  this.$http.$put('/system/sys/permission/edit', params);
    },
    checkSubName(params){
        return  this.$http.$get('/system/sys/permission/checkSubName', params);
    },
}