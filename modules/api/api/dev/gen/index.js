//getGenList, delGen, batchGenCode
module.exports={
    getGenList(params){
        return this.$http.$get('/generator/gen/list', params);
    },
    editGen(params){
        return this.$http.$get('/generator/gen/edit', params);
    },
    delGen(params){
        return this.$http.$post(`/generator/gen/remove`, params);
    },
    batchGenCode(params){
        return this.$http.$get(`/generator/gen/list`, params);
    },
    preview(params){
        return this.$http.$get(`/generator/gen/list`, params);
    },
    getDbList(params){
        return this.$http.$get(`/generator/gen/db/list`, params);
    },
    importTable(params){
        return this.$http.$get(`/generator/gen/list`, params);
    },
    
}