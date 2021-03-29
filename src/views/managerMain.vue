<template>
    <el-container class="home-container">
      <el-header>
        <div class="header-left">
          <span style="margin-left: 15px">房屋租赁系统</span>
        </div>
        <span>欢迎您，{{userName}}</span>
        <el-button type="info" @click="logout" style="margin-right: 80px">退出</el-button>
      </el-header>
      <!--侧边栏-->
      <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">
          <!--菜单栏-->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened :collapse="isCollapse"
            :collapse-transition="false"
            router :default-active="activePath">
            <!--一级菜单-->
            <el-submenu :index="item.id+''" v-for="item in menuList":key="item.id">
              <!--一级菜单模板区域-->
              <template slot="title">
                <!--图标-->
                <i :class="iconObj[item.id]"></i>
                <!--文本-->
                <span>{{item.authName}}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children":key="subItem.id" @click="saveNavState('/'+subItem.path)" >
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-menu"></i>
                  <!--文本-->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
</template>
<script>
export default {
  name: "managerMain",
  created() {
    this.userName=window.sessionStorage.getItem('userName');
  },
  data(){
    return{
      //左侧菜单数据
      menuList:[
        {
          authName: "用户管理",
          children:[
            {
              authName:"用户列表",
              id: 110,
              //order: null,
              path: "managerUser"
            }
          ],
          id: 104,
          order: 1,
          //path: "managerUser"
        },
        {
          authName: "房屋管理",
          children:[
            {
              authName:"房屋列表",
              id: 112,
              order: 1,
              path: "managerHouse"
            }
          ],
          id: 101,
          order: 3,
          path: "managerHouse"
        },
        {
          authName: "信息管理",
          children:[{
            authName:"申请列表",
            id: 115,
            order: null,
            path: "managerApply"
          },
            {
              authName:"租赁列表",
              id: 115,
              order: null,
              path: "managerRent"
            },{
              authName:"报修列表",
              id: 115,
              order: null,
              path: "managerRepair",
            }],
          id: 102,
          order: 4,
          path: "orders"
        },
        {
          authName: "公告管理",
          children:[{
            authName:"公告列表",
            id: 116,
            order: null,
            path: "managerMessage"
          }],
          id: 103,
          order: 5,
          path: "managerMessage"
        },
        {
          authName: "我的信息",
          children:[{
            authName:"我的信息",
            id: 116,
            order: null,
            path: "managerMy"
          }],
          id: 105,
          order: 6,
          path: "managerMy"
        }
      ],
      iconObj:{
        // '104':'iconfont icon-user',
        // '107':'iconfont icon-user',
        // '103':'iconfont icon-tijikongjian',
        // '101':'iconfont icon-shangpin',
        // '102':'iconfont icon-danju',
        // '145':'iconfont icon-baobiao'
      },
      isCollapse:false,
      activePath:'',
      userInfo:{}
    }
  },
  methods: {
    logout(){
      window.sessionStorage.clear();
      this.$router.push('/');
      this.$forceUpdate();
    },
    //保存链接的激活状态
    // saveNavState(activePath){
    //   window.sessionStorage.setItem('activePath',activePath);
    //   this.activePath=activePath;
    // }
  }
}
</script>
<style scoped>
.el-header{
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 22px;
}
.header-left{
  display: flex;
  align-items: center;
}
.el-aside{
  background-color: #333744;

}
.el-menu{
  border-right: none;
}
.el-main{
  background-color: #eaedf1;
}
.home-container{
  height: 100%;
}
.header{
  height: 58px;
  width: 50px;
}
.toggle-button{
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
