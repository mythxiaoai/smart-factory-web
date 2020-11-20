<template>
  <a-drawer
    :title="title"
    :maskClosable="true"
    width=650
    placement="right"
    :closable="true"
    @close="close"
    :visible="visible">
    <a-form>
      <a-spin :spinning="formLoading">
        <a-form-item label='所拥有的权限'>
          <a-tree
            checkable
            @check="onCheck"
            :checkedKeys="checkedKeys"
            :treeData="treeData"
            @expand="onExpand"
            @select="onTreeNodeSelect"
            :selectedKeys="selectedKeys"
            :expandedKeys="expandedKeysss"
            :checkStrictly="checkStrictly"
            :replaceFields="{ title: 'name', value: 'id', key: 'id' }"
            >
            <span slot="hasDatarule" slot-scope="{slotTitle,ruleFlag}">
              {{ slotTitle }}<a-icon v-if="ruleFlag" type="align-left" style="margin-left:5px;color: red;"></a-icon>
            </span>
          </a-tree>
        </a-form-item>
      </a-spin>
    </a-form>

    <div class="drawer-bootom-button">
      <a-dropdown style="float: left" :trigger="['click']" placement="topCenter">
        <a-menu slot="overlay">
          <!-- <a-menu-item key="1" @click="checkStrictly=false">父子关联</a-menu-item>
          <a-menu-item key="2" @click="checkStrictly=true">取消关联</a-menu-item> -->
          <a-menu-item key="3" @click="checkALL">全部勾选</a-menu-item>
          <a-menu-item key="4" @click="cancelCheckALL">取消全选</a-menu-item>
          <a-menu-item key="5" @click="expandAll">展开所有</a-menu-item>
          <a-menu-item key="6" @click="closeAll">合并所有</a-menu-item>
        </a-menu>
        <a-button>
          树操作 <a-icon type="up" />
        </a-button>
      </a-dropdown>
      <a-popconfirm title="确定放弃编辑？" @confirm="close" okText="确定" cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit()" type="primary" :loading="loading">保存</a-button>
    </div>


  </a-drawer>

</template>
<script>
import {convert} from "~/assets/utils/index.js"
  export default {
    name: "RoleModal",
    components:{
    },
    data(){
      return {
        title:"角色权限配置",
        roleId:"",
        treeData: [],
        checkedKeys:[],
        expandedKeysss:[],
        allTreeKeys:[],
        autoExpandParent: true,
        checkStrictly: true,
        visible: false,
        loading: false,
        formLoading:false,
        selectedKeys:[]
      }
    },
    methods: {
      onTreeNodeSelect(id){
        if(id && id.length>0){
          this.selectedKeys = id
        }
      },
      onCheck (o) {
        if(this.checkStrictly){
          this.checkedKeys = o.checked;
        }else{
          this.checkedKeys = o
        }
      },
      show(roleId){
        this.roleId=roleId
        this.visible = true;
      },
      close () {
        this.reset()
        this.$emit('close');
        this.visible = false;
      },
      onExpand(expandedKeys){
        this.expandedKeysss = expandedKeys;
        this.autoExpandParent = false
      },
      reset () {
        this.expandedKeysss = []
        this.checkedKeys = []
        this.loading = false
      },
      expandAll () {
        this.expandedKeysss = this.allTreeKeys
      },
      closeAll () {
        this.expandedKeysss = []
      },
      checkALL () {
        this.checkedKeys = this.allTreeKeys
      },
      cancelCheckALL () {
        this.checkedKeys = []
      },
      handleCancel () {
        this.close()
      },
      async handleSubmit() {
        let params =  {
          roleId:this.roleId,
          lastpermissionIds:this.checkedKeys
        };
        this.loading = true;
        await this.$api.sys.role.saveMenu(params);
        this.loading = false;
        this.close();
        //刷新全局菜单
        this.$store.dispatch('security/currentUserPermission');
      },
      async loadData(){
        this.formLoading = true;
        let menuList = await this.$api.sys.menu.list();
        let currMenuList = await this.$api.sys.role.menuList({roleId:this.roleId});
        this.formLoading = false;

        this.allTreeKeys = menuList.result.map(v=>v.id);

        this.treeData = convert(menuList.result);
        this.expandedKeysss = this.allTreeKeys;

        this.checkedKeys = [...currMenuList.result];
      }
    },
  watch: {
    visible () {
      if (this.visible) {
        this.loadData();
      }
    }
  }
  }

</script>
<style lang="less" scoped>
  .drawer-bootom-button {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    left: 0;
    background: #fff;
    border-radius: 0 0 2px 2px;
  }

</style>