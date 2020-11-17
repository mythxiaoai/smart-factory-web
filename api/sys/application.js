module.exports={
    //list
     list(params){
        return  this.$http.$get('/system/sys/client/list', params);
    },
    //字典
     verify(params){
        return  this.$http.$get('/system/sys/client/checkClientId', params);
    },
    //新增
     add(params){
        return  this.$http.$post('/system/sys/client/add', params);
    },
    //删除
     del(params){
        return  this.$http.$delete('/system/sys/client/deleteBatch', params);
    },
    //修改
     edit(params){
        return  this.$http.$put('/system/sys/client/edit', params);
    },
    //管理员列表
    userList(params){
        return  this.$http.$get('/system/sys/user/clientUserList', params);
    },
    //增加
    addUser(params){
        return  this.$http.$post('/system/sys/client/addClientAdmin', params);
    },
    //解除
    delUser(params){
        return  this.$http.$delete('/system/sys/client/delClientAdmin', params);
    }
}