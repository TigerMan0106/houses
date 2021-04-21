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
        <el-table-column prop="rentId" label="ID" width="90">
        </el-table-column>
        <el-table-column prop="houseId" label="房子id" width="120">
        </el-table-column>
        <el-table-column prop="userId" label="用户id" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="120">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="180">
        </el-table-column>
        <el-table-column prop="rentStatus" label="状态" width="180">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="openRepair(scope.row.houseId,scope.row.userId)" type="text" size="small">报修</el-button>
            <el-button @click="deleteRent(scope.row.rentId)" type="text" size="small">删除</el-button>
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
    <el-dialog title="报修" :visible.sync="addDialogVisible" width="100%" @close="addDialogClosed" style="width: 50%">
      <el-form  :model="repairForm" ref="updateUser" label-width="80px">
        <el-form-item label="报修" prop="userName">
          <el-input type="text" placeholder="请输入用户名" v-model="repairForm.repairNote" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applyRepair()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "managerRent",
  inject:['reload'],
  data(){
    return{
      search:'',
      userName:'',
      pageSize:'5',
      total:'',
      pageNum:'1',
      addDialogVisible:false,
      repairForm:{
        repairStatus: '未处理',
        repairNote:'',
        houseId:'',
        userId:'',
        createTime:'',
      },
      form:{
        rentId:'',
        houseId:'',
        userId:'',
        startTime:'',
        endTime:'',
        rentStatus:''
      },
    }
  },
  created() {
    this.queryList();
    this.userName=window.sessionStorage.getItem('userName');
  },
  methods:{
    addDialogClosed(){
      this.$refs.addDialogVisible.resetFields()
    },
    openRepair(houseId,userId){
      this.repairForm.houseId=houseId;
      this.repairForm.userId=userId;
      this.addDialogVisible=true;
    },
    applyRepair(){
      const _this=this;
      let date=new Date();
      axios.post("repair/insertRepair",{repairStatus:this.repairForm.repairStatus,
        repairNote:this.repairForm.repairNote,
        houseId:this.repairForm.houseId,
        userId:this.repairForm.userId,
        createTime:date}).then(function (res){
          _this.reload();
      });
    },
    deleteRent(rentId){
      const _this=this;
      axios.delete("rent/deleteRent",{params:{rentId:rentId}}).then(function (res){
        _this.reload();
      });
    },
    queryList(){
      const _this=this;
      axios.get("rent/queryRentList",{params:{pageNum:this.pageNum,pageSize:this.pageSize}}).then(function (res){
        _this.form=res.data.list;
        _this.total=res.data.total;
        for (let i=0;i<_this.form.length;i++){
          _this.form[i].startTime=new Date(+new Date(res.data.list[i].startTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          _this.form[i].endTime=new Date(+new Date(res.data.list[i].endTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        }
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
  }
}
</script>
<style scoped>
</style>
