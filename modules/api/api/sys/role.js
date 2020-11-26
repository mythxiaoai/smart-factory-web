//角色管理
module.exports={
    //list
     list(params){
        return  this.$http.$get('/system/sys/role/list', params);
    },
    //字典唯一校验
     verify(params){
        return  this.$http.$get('/system/sys/role/checkRoleCode', params);
    },
    //新增
     add(params){
        return  this.$http.$post('/system/sys/role/add', params);
    },
    //删除
     del(params){
        return  this.$http.$delete('/system/sys/role/deleteBatch', params);
    },
    //修改
     edit(params){
        return  this.$http.$put('/system/sys/role/edit', params);
    },
    //角色下的菜单列表
    menuList(params){
        return  this.$http.$get('/system/sys/permission/queryRolePermission', params);
    },
    //保存角色菜单
    saveMenu(params){
        return  this.$http.$post('/system/sys/permission/saveRolePermission', params);
    },
    //保存角色菜单
    queryall(params){
        return  this.$http.$get('/system/sys/role/queryall', params);
    },
    //获取角色List
    userbyroleId(params){
        return  this.$http.$get('/system/sys/user/userRoleList', params);
    },
    //解除角色关系
    deleteUserRole(params){
        return  this.$http.$delete('/system/sys/role/deleteUserRole', params);
    },
    //获取角色List
    otherUserRoleList(params){
        return  this.$http.$get('/system/sys/user/otherUserRoleList', params);
    },
    //绑定角色和用户
    addSysUserRole(params){
        return  this.$http.$post('/system/sys/role/addSysUserRole', params);
    },
}