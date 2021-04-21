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
        <el-table-column prop="repairId" label="ID" width="90">
        </el-table-column>
        <el-table-column prop="houseId" label="标题" width="120">
        </el-table-column>
        <el-table-column prop="userId" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="repairNote" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="省份" width="180">
        </el-table-column>
        <el-table-column prop="repairStatus" label="省份" width="180">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="updateRepair(scope.row.repairId)" type="text" size="small">处理</el-button>
            <el-button @click="deleteRepair(scope.row.repairId)" type="text" size="small">删除</el-button>
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
  name: "managerRepair",
  inject:['reload'],
  data(){
    return{
      form:{
        repairId:'',
        houseId:'',
        userId:'',
        repairNote:'',
        repairStatus:'',
        createTime:''
      },
      total:'',
      search:'',
      pageSize:'5',
      pageNum:'1',
    }
  },
  methods:{
    updateRepair(repairId){
      const _this=this;
      axios.put("repair/updateStatus",{},{params:{repairId:repairId,repairStatus:'已处理'}}).then(function (res){
        _this.reload();
      })
    },
    deleteRepair(repairId){
      const _this=this;
      axios.delete("repair/deleteRepair",{params:{repairId:repairId}}).then(function (res){
        _this.reload();
      });
    },
    queryList(){
      const _this=this;
      axios.get("repair/queryRepairList",{params:{pageSize:this.pageSize,pageNum:this.pageNum}}).then(function (res){
        _this.form=res.data.list;
        _this.total=res.data.total;
        for (let i=0;i<_this.form.length;i++){
          _this.form[i].createTime=new Date(+new Date(res.data.list[i].createTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
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
  },
  created() {
    this.queryList();
    this.userName=window.sessionStorage.getItem('userName');
  }
}
</script>

<style scoped>

</style>
