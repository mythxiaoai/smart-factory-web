//角色管理
module.exports={
    //list
     list(params){
        return  this.$http.$get('/system/sys/user/list', params);
    },
    //字典唯一校验
     verify(params){
        return  this.$http.$get('/system/sys/user/checkUsername', params);
    },
    //字典唯一校验
     verify2(params){
        return  this.$http.$get('/system/sys/user/checkWorkNo', params);
    },
    //新增
     add(params){
        return  this.$http.$post('/system/sys/user/add', params);
    },
    //删除
     del(params){
        return  this.$http.$delete('/system/sys/user/deleteBatch', params);
    },
    //修改
     edit(params){
        return  this.$http.$put('/system/sys/user/edit', params);
    },
    //冻结
    freeze(params){
        return  this.$http.$put('/system/sys/user/frozenBatch', params);
    },
    
    //重置密码
    resetPassword(params){
        return  this.$http.$put('/system/sys/user/resetPassword', params);
    },
    //修改密码
    updatePassword(params){
        return  this.$http.$put('/system/sys/user/updatePassword', params);
    }
   
}