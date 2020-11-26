//角色管理
module.exports={
    //list
     list(params){
        return  this.$http.$get('/generator/datasource/list', params);
    },
    //新增
     add(params){
        return  this.$http.$post('/generator/datasources/addDruid', params);
    },
    //删除
     del(params){
        return  this.$http.$delete('/generator/datasources', params);
    },
    //修改
     edit(params){
        return  this.$http.$put('/system/sys/user/edit', params);
    }
}