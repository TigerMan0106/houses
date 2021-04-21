<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="搜索" clearable v-model="search" prop="search" @clear="queryList()">
            <el-button slot="append" icon="el-icon-search" @click="queryList(search)" ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="form" border style="width: 100%">
        <el-table-column prop="applyId" label="ID" width="90">
        </el-table-column>
        <el-table-column prop="houseId" label="房屋ID" width="120">
        </el-table-column>
        <el-table-column prop="houseName" label="房屋名" width="120">
        </el-table-column>
        <el-table-column prop="ownerName" label="房东名" width="120">
        </el-table-column>
        <el-table-column prop="userId" label="租客ID" width="120">
        </el-table-column>
        <el-table-column prop="userRealName" label="租客名" width="120">
        </el-table-column>
        <el-table-column prop="applyStatus" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="120">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="180">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="acceptApply(scope.row.applyId,scope.row.houseId)" type="text" size="small">接受</el-button>
            <el-button @click="rejectApply(scope.row.applyId)" type="text" size="small">拒绝</el-button>
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
  </div>
</template>
<script>
import axios from "axios";
function findUserName(userId,i){
  const _this=this;
  return axios.get("user/queryUserById",{params:{userId:userId}}).then(res=>res.data
  );}
export default {
  name: "managerApply",
  inject:['reload'],
  data(){
    return{
      houseStatus:'已出租',
      search:'',
      reject:'已拒绝',
      accept:'以接受',
      pageSize:'5',
      pageNum:'1',
      total:'',
      form:{
        applyId:'',
        houseId:'',
        houseName:'',
        ownerName:'',
        userId:'',
        userRealName:'',
        applyStatus: '',
        startTime:'',
        endTime:'',
      },
      updateForm:{
        applyId:'',
        houseId:'',
        userId:'',
        applyStatus: '',
        startTime:'',
        endTime:'',
      },
      searchUser:{
        houseId:'',
        userId:'',
      },
      userNames:[]
    }
  },
  created() {
    this.queryList();
    this.userName=window.sessionStorage.getItem('userName');
  },
  methods:{
    updateStatus:function(houseId){
      axios.put("house/updateStatus",{},{params:{houseId:houseId,houseStatus:this.houseStatus}}).then(function (res){

      });
    },
    acceptAp:function (applyId){
      const _this=this;
      axios.put("apply/updateApplyStatus",{},{params:{applyId:applyId,applyStatus:this.accept}}).then(function (res){
        _this.reload();
      });
      axios.get("apply/getApply",{params:{applyId:applyId}}).then(function (res){
        axios.post("rent/insertRent",{houseId:res.data.houseId,userId:res.data.userId,startTime:res.data.startTime,endTime:res.data.endTime,rentStatus:'出租中'}).then(function (res){
        });
        _this.reload();
      });
    },
    acceptApply(applyId,houseId){
      const _this=this;
      axios.get("house/getHouse",{params:{houseId:houseId}}).then(function (res){
        if (res.data.houseStatus=='未出租'){
          _this.updateStatus(houseId);
          _this.acceptAp(applyId);
        }else {
          alert("该房屋已被租借");
        }
      });
    },
    rejectApply(applyId){
      const _this=this;
      axios.put("apply/updateApplyStatus",{},{params:{applyId:applyId,applyStatus:this.reject}}).then(function (res){
        _this.reload();
      });
    },
    handleSizeChange(newSize){
      this.pageSize = newSize;
      this.queryList();
    },
    handleCurrentChange(newSize){
      this.pageNum = newSize;
      this.queryList();
    },
    async queryList(){
      const _this=this;
      axios.get("apply/applyList",{params:{pageNum:this.pageNum,pageSize:this.pageSize,houseId:this.search,userId:this.searchUser.userId}}).then(function (res){
        _this.form=res.data.list;
        _this.total=res.data.total;
        for (let i=0;i<_this.form.length;i++){
          _this.form[i].startTime=new Date(+new Date(res.data.list[i].startTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          _this.form[i].endTime=new Date(+new Date(res.data.list[i].endTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        }
      });
    }
  }
}
</script>
<style scoped>
</style>
