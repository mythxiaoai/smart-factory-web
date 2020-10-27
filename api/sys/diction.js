module.exports={
    //list
     list(params){
        return  this.$axios.$get('/system/sys/dict/list', {params});
    },
    //字典唯一校验
     verify1(params){
        return  this.$axios.$get('/system/sys/dict/checkDictCode', {params});
    },
    //字典项唯一校验
     verify2(params){
        return  this.$axios.$get('/system/sys/dict/checkDictItemCode', {params});
    },
    //新增-字典
     add(params){
        return  this.$axios.$post('/system/sys/dict/add', params);
    },
    //删除-字典
     del(params){
        return  this.$axios.$delete('/system/sys/dict/deleteBatch', {data:params});
    },
    //修改-字典
     edit(params){
        return  this.$axios.$put('/system/sys/dict/edit', params);
    },
    //新增-字典项
    addItem(params){
        return this.$axios.$post('/system/sys/dict/item/add', params);
    },
    //删除-字典项
    delItem(params){
        return this.$axios.$delete('/system/sys/dict/item/deleteBatch', {data:params});
    },
    //修改-字典项
     editItem(params){
        return  this.$axios.$put('/system/sys/dict/item/edit', params);
    }
}