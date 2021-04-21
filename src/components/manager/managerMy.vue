<template>
  <el-form  :model="form" ref="updateUser" label-width="80px">
    <el-form-item label="用户名" prop="userName">
      <el-input type="text" placeholder="请输入用户名" v-model="form.userName" prefix-icon="el-icon-user-solid" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="userPwd">
      <el-input type="text" placeholder="请输入密码" v-model="form.userPwd" prefix-icon="el-icon-lock" ></el-input>
    </el-form-item>
    <el-form-item label="真实姓名" prop="userRealName" >
      <el-input type="text" placeholder="请输入真实姓名" v-model="form.userRealName"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="userPhone">
      <el-input type="text" placeholder="请输入电话" v-model="form.userPhone"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="userSex">
      <el-select v-model="form.userSex" placeholder="请选择性别">
        <el-option label="男" value="男" key="男">男</el-option>
        <el-option label="女" value="女" key="女">女</el-option>
      </el-select>
    </el-form-item>
    <el-button type="primary" @click="update()">修改信息</el-button>
  </el-form>
</template>
<script>
import axios from "axios";
export default {
  name: "managerMy",
  inject:['reload'],
  data(){
    return{
      userName:'',
      form:{
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
  created() {
    this.queryList(window.sessionStorage.getItem('userName'));
    this.userName=window.sessionStorage.getItem('userName');
  },
  methods:{
    update(){
      const _this=this;
      axios.put("user/updateUser",{userName:this.userName,userRealName:this.form.userRealName,
        userPwd:this.form.userPwd,userSex:this.form.userSex,userPhone:this.form.userPhone,userRole:this.form.userRole}).then(function (res){
        _this.reload();
        alert("修改成功");
      })
    },
    queryList(userName){
      const _this=this;
      axios.get("user/beforeUpdate",{params:{userName:userName}}).then(function (res){
        _this.form=res.data;
      });
    }
  }
}
</script>

<style scoped>

</style>
