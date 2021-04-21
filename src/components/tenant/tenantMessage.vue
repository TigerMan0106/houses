<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入标题搜索" clearable v-model="search" @clear="queryList()">
            <el-button slot="append" icon="el-icon-search" @click="queryList(search)" ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="form" border style="width: 100%">
        <el-table-column prop="messageId" label="公告ID" width="90">
        </el-table-column>
        <el-table-column prop="messageName" label="公告标题" width="120">
        </el-table-column>
        <el-table-column prop="messageContent" label="公告内容" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="createUser" label="人" width="90">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="updateMessage(scope.row.messageId)"  type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total=total>
      </el-pagination>
    </el-card>
    <el-dialog title="公告" :visible.sync="updateDialogVisible" width="100%" @close="updateDialogClosed" style="width: 50%">
      <el-form  :model="updateForm" ref="updateUser" label-width="80px">
        <el-form-item label="标题" prop="messageName">
          <el-input type="text" placeholder="请输入标题" v-model="updateForm.messageName" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="messageContent">
          <el-input type="text" placeholder="请输入内容" v-model="updateForm.messageContent" prefix-icon="el-icon-lock" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Closed()">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "tenantMessage",
  inject:['reload'],
  data(){
    return{
      userName:'',
      search:'',
      updateDialogVisible:false,
      total:'',
      pageNum:'1',
      pageSize:'5',
      form:{
        messageId:'',
        messageName:'',
        messageContent:'',
        createTime:'',
        createUser:''
      },
      updateForm:{
        messageId:'',
        messageName:'',
        messageContent:'',
        createTime:'',
        createUser:''
      },
    }
  },
  methods:{
    Closed(){
      this.updateDialogVisible=false;
    },
    onMit(messageName,messageContent,messageId){
      const _this=this;
      let date=new Date();
      let createUser=this.userName;
      axios.put("message/updateMessage",{messageId:messageId,
        messageName:messageName,
        messageContent:messageContent,
        createTime:date,
        createUser:createUser,}).then(function (res){
        //alert(res.data.msg);
        _this.reload();
      });
    },
    updateDialogClosed(){
      this.$refs.updateDialogVisible.resetFields()
    },
    updateMessage(messageId){
      const _this=this;
      axios.get("message/getMessage",{params:{messageId}}).then(function (res){
        _this.updateForm=res.data;
      });
      this.updateDialogVisible = true;
    },
    goInsertPage(){
      this.addDialogVisible = true;
    },
    handleSizeChange(newSize){
      this.pageSize = newSize;
      this.queryList();
    },
    handleCurrentChange(newSize){
      this.pageNum = newSize;
      this.queryList();
    },
    queryList(){
      const _this=this;
      axios.get("message/queryMessage",{params:{pageNum:this.pageNum,pageSize:this.pageSize,messageName:this.search}}).then(function (res){
        _this.form=res.data.list;
        _this.total=res.data.total;
        for (let i=0;i<_this.form.length;i++){
          _this.form[i].createTime=new Date(+new Date(res.data.list[i].createTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        }
      })
    }
  },
  created() {
    this.queryList();
    this.userName=window.sessionStorage.getItem('userName');
  }
}
</script>
<style scoped>
</style>
