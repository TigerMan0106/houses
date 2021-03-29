<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
<!--          <el-select v-model="form.userRole"  placeholder="请选择身份">-->
<!--            <el-option label="租客" value="租客" key="租客" >租客</el-option>-->
<!--            <el-option label="房东" value="房东" key="房东">房东</el-option>-->
<!--            <el-option label="管理员" value="管理员" key="管理员">管理员</el-option>-->
<!--          </el-select>-->
          <el-input placeholder="请输入用户名搜索" clearable v-model="search" prop="search" @clear="queryList()">
            <el-button slot="append" icon="el-icon-search" @click="queryList(search)" ></el-button>
          </el-input>
        </el-col>
<!--        <el-col :span="6">-->
<!--            <el-button type="primary" @click="deleteList()">清除</el-button>-->
<!--        </el-col>-->
        <el-col :span="4">
          <el-button type="primary" @click="goInsertPage()" >添加用户</el-button>
        </el-col>
      </el-row>
    <el-table :data="form" border style="width: 100%">
      <el-table-column prop="userId" label="用户ID" width="90">
      </el-table-column>
      <el-table-column prop="userName" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="userRealName" label="真实姓名" width="180">
      </el-table-column>
      <el-table-column prop="userPwd" label="密码" width="180">
      </el-table-column>
      <el-table-column prop="userRole" label="角色" width="90">
      </el-table-column>
      <el-table-column prop="userPhone" label="电话" width="120">
      </el-table-column>
      <el-table-column prop="userSex" label="性别" width="90">
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button @click="updateUser(scope.row.userName)"  type="text" size="small">修改</el-button>
          <el-button @click="deleteUser(scope.row.userName)" type="text" size="small">删除</el-button>
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
  <el-dialog title="修改信息" :visible.sync="updateDialogVisible" width="100%" @close="updateDialogClosed" style="width: 50%">
    <el-form  :model="updateForm" ref="updateUser" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" placeholder="请输入用户名" v-model="updateForm.userName" prefix-icon="el-icon-user-solid" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input type="text" placeholder="请输入密码" v-model="updateForm.userPwd" prefix-icon="el-icon-lock" ></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="userRealName" >
        <el-input type="text" placeholder="请输入真实姓名" v-model="updateForm.userRealName"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="userPhone">
        <el-input type="text" placeholder="请输入电话" v-model="updateForm.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="userRole">
        <el-select v-model="updateForm.userRole" placeholder="请选择身份">
          <el-option label="租客" value="租客" key="租客">租客</el-option>
          <el-option label="房东" value="房东" key="房东">房东</el-option>
          <el-option label="管理员" value="管理员" key="管理员">管理员</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="userSex">
        <el-select v-model="updateForm.userSex" placeholder="请选择性别">
          <el-option label="男" value="男" key="男">男</el-option>
          <el-option label="女" value="女" key="女">女</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onMit(updateForm.userName,updateForm.userPwd,updateForm.userRole,updateForm.userSex,updateForm.userPhone,updateForm.userRealName)">修改</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="100%" @close="addDialogClosed" style="width: 50%">
      <el-form  :model="addForm" ref="updateUser" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input type="text" placeholder="请输入用户名" v-model="addForm.userName" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd">
          <el-input type="text" placeholder="请输入密码" v-model="addForm.userPwd" prefix-icon="el-icon-lock" ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="userRealName" >
          <el-input type="text" placeholder="请输入真实姓名" v-model="addForm.userRealName"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="userPhone">
          <el-input type="text" placeholder="请输入电话" v-model="addForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="userRole">
          <el-select v-model="addForm.userRole" placeholder="请选择身份">
            <el-option label="租客" value="租客" key="租客">租客</el-option>
            <el-option label="房东" value="房东" key="房东">房东</el-option>
            <el-option label="管理员" value="管理员" key="管理员">管理员</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-select v-model="addForm.userSex" placeholder="请选择性别">
            <el-option label="男" value="男" key="男">男</el-option>
            <el-option label="女" value="女" key="女">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertUser(addForm.userName,addForm.userPwd,addForm.userRole,addForm.userSex,addForm.userPhone,addForm.userRealName)">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  inject:['reload'],
  data(){
    return{
      search:'',
      updateDialogVisible:false,
      addDialogVisible:false,
      total:'',
      pageNum:'1',
      pageSize:'5',
      form:{
        userId:'',
        userName: '',
        userRealName:'',
        userPwd: '',
        userRole:'',
        userSex:'',
        userPhone:''
      },
      updateForm:{
        userId:'',
        userName: '',
        userRealName:'',
        userPwd: '',
        userRole:'',
        userSex:'',
        userPhone:''
      },
      addForm:{
        userId:'',
        userName: '',
        userRealName:'',
        userPwd: '',
        userRole:'',
        userSex:'',
        userPhone:''
      }
    }
  },
  methods:{
    deleteList(){
      this.search='';
      this.queryList();
    },
    goInsertPage(){
      this.addDialogVisible = true;
    },
    insertUser(userName,userPwd,userRole,userSex,userPhone,userRealName){
      const _this=this;
      axios.post("user/addUser",{userName:userName,
        userRealName:userRealName,
        userPwd:userPwd,
        userSex:userSex,
        userPhone:userPhone,
        userRole:userRole}).then(function (res){
        alert(res.data.msg);
        _this.reload();
      });
    },
    onMit(userName,userPwd,userRole,userSex,userPhone,userRealName){
      const _this=this;
      axios.put("user/updateUser",{userName:userName,userPwd:userPwd,userRole:userRole,userSex:userSex,userPhone:userPhone,userRealName:userRealName}).then(function (res){
        alert(res.data.msg);
        _this.reload();
      });
    },
    updateDialogClosed(){
      this.$refs.updateDialogVisible.resetFields()
    },
    addDialogClosed(){
      this.$refs.addDialogVisible.resetFields()
    },
    handleSizeChange(newSize){
      this.pageSize = newSize
      this.queryList()
    },
    handleCurrentChange(newSize){
      this.pageNum = newSize
      this.queryList()
    },
    deleteUser(userName){
      const _this=this;
      axios.delete("user/deleteUser",{params:{userName:userName}}).then(function (res){
        _this.reload();
      })
    },
    updateUser(userName){
      const _this=this;
      axios.get("user/beforeUpdate",{params:{userName:userName}}).then(function (res){
        _this.updateForm.userRealName=res.data.userRealName;
        _this.updateForm.userName=res.data.userName;
        _this.updateForm.userPwd=res.data.userPwd;
        _this.updateForm.userRole=res.data.userRole;
        _this.updateForm.userPhone=res.data.userPhone;
        _this.updateForm.userSex=res.data.userSex;
      });
      this.updateDialogVisible = true;
    },
    queryList(){
      const _this=this;
      this.axios.get("user/userList",{params:{pageNum:this.pageNum,pageSize:this.pageSize,userName:this.search}}).then(function (res){
        _this.form=res.data.list;
        _this.total=res.data.total;
      })
    }
  },
  created() {
    this.queryList();
  },
  name: "managerUser"
}
</script>
<style scoped>
</style>
