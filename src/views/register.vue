<template>
  <div class="login-box">
    <el-form ref="loginForm" :model="form" label-width="80px">
      <h3 class="login-title">注册</h3>
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" placeholder="请输入用户名" v-model="form.userName" prefix-icon="el-icon-user-solid">用户名</el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input type="password" placeholder="请输入密码" v-model="form.userPwd" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="userRealName" >
        <el-input type="text" placeholder="请输入真实姓名" v-model="form.userRealName"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="userPhone">
        <el-input type="text" placeholder="请输入电话" v-model="form.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="userRole">
        <el-select v-model="form.userRole" placeholder="请选择身份">
          <el-option label="租客" value="租客" key="租客">租客</el-option>
          <el-option label="房东" value="房东" key="房东">房东</el-option>
          <el-option label="管理员" value="管理员" key="管理员">管理员</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="userSex">
        <el-select v-model="form.userSex" placeholder="请选择性别">
          <el-option label="男" value="男" key="男">男</el-option>
          <el-option label="女" value="女" key="女">女</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form.userName,form.userPwd,form.userRole,form.userSex,form.userPhone,form.userRealName)">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data(){
    return{
      form:{
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
    onSubmit(userName,userPwd,userRole,userSex,userPhone,userRealName){
      const _this=this;
      axios.post('user/addUser',{userName:userName,
        userRealName:userRealName,
        userPwd:userPwd,
        userSex:userSex,
        userPhone:userPhone,
        userRole:userRole}).then(function (res){
        if (res.data.code==200){
          alert(res.data.msg);
          _this.$router.push('/');
        }else {
          alert(res.data.msg);
        }
      });
    }
  },
  name: "register"
}
</script>
<style scoped>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  position: absolute;
  left:50%;
  top: 50%;
  transform: translate(-50%,-50%);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 10px #909399;
  background-color: white;
}
.login-title {
  text-align: center;
  margin: 0 auto 10px auto;
  color: #303133;
}
</style>
