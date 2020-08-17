<template>
  <div>
    {{test}}
    <a-table
      :columns="columns"
      :rowKey="record => record.login.uuid"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
      :scroll="{ x:true,scrollToFirstRowOnChange:true}"
    >
      <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ],
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email'
  }
]
import { Table } from 'ant-design-vue'
var mixin = {
  data() {
    return {
      aaaaaaaaaaa: 'hello',
    }
  }
}

export default {
  mixin:[mixin],
  created(){
    console.log(this);
  },
  mounted() {
    this.list()
    // Table.mixin({
    //   props:{
    //     bordered:true
    //   }
    // })
    console.log(Table)
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
    }
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.list({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    list(params = {}) {
      params = {
        results: 10,
        ...params
      }
      function geturl(json) {
        let str = ''
        for (const key in json) {
          str += `${encodeURI(key)}=${encodeURI(json[key])}&`
        }
        return '?' + str.slice(0, -1)
      }
      this.loading = true
      window
        .fetch('https://randomuser.me/api' + geturl(params), {
          method: 'get'
        })
        .then((res) => res.json())
        .then((data) => {
          const pagination = { ...this.pagination }
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200
          this.loading = false
          this.data = data.results
          this.pagination = pagination
        })
    }
  }
}
</script>

<style>
.ant-table td {
  white-space: nowrap;
}
</style>