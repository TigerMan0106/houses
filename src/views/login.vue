<template>
  <div class="login-box">
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px">
      <h3 class="login-title">欢迎使用</h3>
      <el-form-item label="帐号" prop="userName">
        <el-input type="text" placeholder="请输入帐号" v-model="form.userName" prefix-icon="el-icon-user-solid">帐号</el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input type="password" placeholder="请输入密码" v-model="form.userPwd" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="userRole">
        <el-select v-model="form.userRole" placeholder="请选择身份">
          <el-option label="租客" value="租客" key="租客" >租客</el-option>
          <el-option label="房东" value="房东" key="房东">房东</el-option>
          <el-option label="管理员" value="管理员" key="管理员">管理员</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form.userName,form.userPwd,form.userRole)">登录</el-button>
        <el-button @click="jump">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    data(){
      return{
        form: {
          userName: '',
          userPwd: '',
          userRole:'',
        },
        rules: {
          username: [
            {required: true, message: '账号不可为空', trigger: 'blur'},
            {min:6,max:20,message:'长度在6-20个字符内'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'},
            {min:6,max:20,message:'长度在6-20个字符内'}
          ]
        },
      }
    },
    methods:{
       onSubmit(name,password,role){
         const _this=this;
         axios.get('user/login',{params:{userName:this.form.userName,userPwd:this.form.userPwd,userRole:this.form.userRole}}).then(function (res){
           if (res.data.code==300){
             alert(res.data.msg);
           }
           if(res.data.code==200&&role=="管理员"){
             window.sessionStorage.setItem("userName",name);
             _this.$router.push('/managerMain');
           }else if (res.data.code==200&&role=="租客"){
             window.sessionStorage.setItem("userName",name);
             _this.$router.push('/tenantMain');
           }else if (res.data.code==200&&role=="房东"){
             window.sessionStorage.setItem("userName",name);
             _this.$router.push('/landlordMain');
           }
         });
      },
      jump(){
        this.$router.push('/register');
      }
    },
    rules: {
      username: [
        {required: true, message: '账号不可为空', trigger: 'blur'},
        {min:6,max:20,message:'长度在6-20个字符内'}
      ],
      password: [
        {required: true, message: '密码不可为空', trigger: 'blur'},
        {min:6,max:20,message:'长度在6-20个字符内'}
      ]
    },
    name: "login"
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
