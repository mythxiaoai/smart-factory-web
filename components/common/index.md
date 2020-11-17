initSearch() {
       //重置分页参数
      let query = JSON.parse(JSON.stringify(pagination));
      let keys = Object.keys(this.setHTTParams);
      if(~keys.indexOf(this.setHTTPPageKey.currentPage)){
        this.pagination.current = this.setHTTParams[this.setHTTPPageKey.currentPage]
      }
      if(~keys.indexOf(this.setHTTPPageKey.pageSize)){
        this.pagination.pageSize = this.setHTTParams[this.setHTTPPageKey.pageSize]
      }
        //判断
      if (!isExistkeys(this.setHTTParams, this.setHTTPPageKey)) {
        throw new Error(
          '参数setHTTParams中，必须含有setHTTPPageKey中的分页参数'
        )
      }
      //附加参数
      let query = JSON.parse(JSON.stringify(this.setHTTParams))
      

      
      //查询参数
      this.formItem.forEach((v) => {
        let key = v?.options?.prop
        if (key) query[key] = v.options?.defaultValue ?? ''
      })
      this.queryParam = query
    },