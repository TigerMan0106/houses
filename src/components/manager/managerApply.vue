<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="搜索" clearable v-model="search" @clear="queryList()">
            <el-button slot="append" icon="el-icon-search" @click="queryList(search)" ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="form" border style="width: 100%">
        <el-table-column prop="applyId" label="ID" width="90">
        </el-table-column>
        <el-table-column prop="houseId" label="标题" width="120">
        </el-table-column>
        <el-table-column prop="userId" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="applyStatus" label="面积" width="120">
        </el-table-column>
        <el-table-column prop="startTime" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="endTime" label="省份" width="180">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="goUpdate(scope.row.applyId)"  type="text" size="small">修改</el-button>
            <el-button @click="acceptApply(scope.row.applyId)" type="text" size="small">接受</el-button>
            <el-button @click="rejectApply(scope.row.applyId)" type="text" size="small">拒绝</el-button>
            <el-button @click="lookApply(scope.row.applyId)" type="text" size="small">查看</el-button>
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
export default {
  name: "managerApply",
  data(){
    return{
      pageSize:'5',
      pageNum:'1',
      total:'',
      form:{
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
    }
  },
  created() {
    const _this=this;
    this.queryList();
    this.userName=window.sessionStorage.getItem('userName');
  },
  methods:{
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
      axios.get("apply/applyList",{params:{pageNum:this.pageNum,pageSize:this.pageSize,houseId:this.searchUser.houseId,userId:this.searchUser.userId}}).then(function (res){
        _this.form=res.data.list;
        _this.total=res.data.total;
        for (let i=0;i<_this.form.length;i++){
          _this.form[i].startTime=new Date(+new Date(res.data.list[i].startTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          _this.form[i].endTime=new Date(+new Date(res.data.list[i].endTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        }
        _this.reload();
      })
    }
  }
}
</script>
<style scoped>
</style>
