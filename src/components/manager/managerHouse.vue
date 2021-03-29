<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="搜索" clearable v-model="search" @clear="queryList()">
            <el-button slot="append" icon="el-icon-search" @click="queryList(search)" ></el-button>
          </el-input>
        </el-col>
<!--        <el-col :span="6">-->
<!--          <el-button type="primary" @click="deleteList()">清除</el-button>-->
<!--        </el-col>-->
        <el-col :span="4">
          <el-button type="primary" @click="goInsertPage()" >添加房屋</el-button>
        </el-col>
      </el-row>
      <el-table :data="form" border style="width: 100%">
        <el-table-column prop="houseId" label="房屋ID" width="90">
        </el-table-column>
        <el-table-column prop="houseName" label="标题" width="120">
        </el-table-column>
        <el-table-column prop="housePrice" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="houseArea" label="面积" width="120">
        </el-table-column>
        <el-table-column prop="houseStatus" label="状态" width="120">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="180">
        </el-table-column>
        <el-table-column prop="city" label="市" width="180">
        </el-table-column>
        <el-table-column prop="district" label="区" width="90">
        </el-table-column>
        <el-table-column prop="address" label="详细地址" width="120">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="goUpdate(scope.row.houseId)"  type="text" size="small">修改</el-button>
            <el-button @click="deleteHouse(scope.row.houseId)" type="text" size="small">删除</el-button>
            <el-button @click="lookHouse(scope.row.houseId)" type="text" size="small">查看</el-button>
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
    <el-dialog title="添加房源" :visible.sync="addDialogVisible" width="100%" @close="addDialogClosed" style="width: 50%">
      <el-upload
        action="C:\Users\HP\Desktop\图片"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-preview="handlePictureCardPreview"
        :file-list="fileList"
        ref="upload"
        :http-request="upload"
        :auto-upload="false"
        :limit="5">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <el-form  :model="addForm" ref="updateHouse" label-width="80px">
        <el-form-item label="标题" prop="houseName">
          <el-input type="text" placeholder="请输入房屋标题" v-model="addForm.houseName" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input type="text" placeholder="请输入价格" v-model="addForm.userId" prefix-icon="el-icon-lock" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="housePrice">
          <el-input type="text" placeholder="请输入价格" v-model="addForm.housePrice" prefix-icon="el-icon-lock" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="houseNote" >
          <el-input type="text" placeholder="请输入备注" v-model="addForm.houseNote"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="houseType">
          <el-input type="text" placeholder="请输入类型" v-model="addForm.houseType"></el-input>
        </el-form-item>
        <el-form-item label="面积" prop="houseArea">
          <el-input type="text" placeholder="请输入面积" v-model="addForm.houseArea"></el-input>
        </el-form-item>
        请选择地址<br>
        <v-distpicker :province="select.province" :city="select.city" :area="select.area"  @selected="onSelected"></v-distpicker>
        <el-form-item label="详细地址" prop="address">
          <el-input type="text" placeholder="请输入详细地址" v-model="addForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="insertHouse(addForm.houseName,addForm.housePrice,addForm.houseNote,addForm.houseType,addForm.houseArea,addForm.province,addForm.city,addForm.district,addForm.address,addForm.userId)">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改房源" :visible.sync="updateDialogVisible" width="100%" @close="updateDialogClosed" style="width: 50%">
      <el-image
        style="width: 100px; height: 100px"
        :src="require('./haha.jpg')"></el-image>
      <el-form  :model="updateForm" ref="updateUser" label-width="80px">
        <el-form-item label="标题" prop="userName">
          <el-input type="text" placeholder="请输入标题" v-model="updateForm.houseName" ></el-input>
        </el-form-item>
        <el-form-item label="房东ID" prop="userPwd">
          <el-input type="text" placeholder="请输入价格" v-model="updateForm.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="userPwd">
          <el-input type="text" placeholder="请输入价格" v-model="updateForm.housePrice"  ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="userRealName" >
          <el-input type="text" placeholder="请输入备注" v-model="updateForm.houseNote" ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="userPhone">
          <el-input type="text" placeholder="请输入类型" v-model="updateForm.houseType"></el-input>
        </el-form-item>
        <el-form-item label="面积" prop="userPhone">
          <el-input type="text" placeholder="请输入面积" v-model="updateForm.houseArea" ></el-input>
        </el-form-item>
        <v-distpicker :province="updateForm.province" :city="updateForm.city" :area="updateForm.district"  @selected="onUpdateSelected"></v-distpicker>
        <el-form-item label="详细地址" prop="userPhone">
          <el-input type="text" placeholder="请输入详细地址" v-model="updateForm.address" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateHouse()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="查看房源" :visible.sync="lookDialogVisible" width="100%" @close="addDialogClosed" style="width: 50%">
      <el-image
        style="width: 100px; height: 100px"
        :src="require('./haha.jpg')"></el-image>
      <el-form  :model="lookForm" ref="updateUser" label-width="80px">
        <el-form-item label="标题" prop="userName">
          <el-input type="text" placeholder="请输入标题" v-model="lookForm.houseName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房东ID" prop="userPwd">
          <el-input type="text" placeholder="请输入价格" v-model="lookForm.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="userPwd">
          <el-input type="text" placeholder="请输入价格" v-model="lookForm.housePrice" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="userRealName" >
          <el-input type="text" placeholder="请输入备注" v-model="lookForm.houseNote" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="userPhone">
          <el-input type="text" placeholder="请输入类型" v-model="lookForm.houseType" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="面积" prop="userPhone">
          <el-input type="text" placeholder="请输入面积" v-model="lookForm.houseArea" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="省" prop="userRole">
          <el-input type="text" v-model="lookForm.province" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="市" prop="userSex">
          <el-input type="text" v-model="lookForm.city" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="区" prop="userSex">
          <el-input type="text" v-model="lookForm.district" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="userPhone">
          <el-input type="text" placeholder="请输入详细地址" v-model="lookForm.address" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openApply()">申请租赁</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="申请租赁" :visible.sync="applyDialogVisible" width="100%" @close="applyDialogClosed" style="width: 50%">
      <el-form>
        <el-form-item>
          <el-date-picker
            v-model="applyForm.startTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <el-date-picker
            v-model="applyForm.endTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sentApply()">申请租赁</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import VDistpicker from 'v-distpicker'
import axios from "axios";
export default {
  components: { VDistpicker },
  inject:['reload'],
  name: "managerHouse",
  methods:{
    onUpdateSelected(data){
      this.updateForm.province = data.province.value;
      this.updateForm.city = data.city.value;
      this.updateForm.district = data.area.value;
    },
    updateHouse(houseName,housePrice,houseNote,houseType,houseArea,province,city,district,address,houseId){
      const _this=this;
      axios.put("house/updateHouse",{houseName:this.updateForm.houseName,housePrice:this.updateForm.housePrice,houseNote:this.updateForm.houseNote,houseType:this.updateForm.houseType,houseArea:this.updateForm.houseArea,province:this.updateForm.province,city:this.updateForm.city,district:this.updateForm.district,address:this.updateForm.address
        ,houseId:this.updateForm.houseId}).then(function (res){
        _this.reload();
      });
    },
    sentApply(){
      const _this=this;
      axios.get("user/beforeUpdate",{params:{userName:this.userName}}).then(function (res){
        axios.post("apply/insertApply",{houseId:_this.applyForm.houseId,userId:res.data.userId,applyStatus:_this.applyForm.applyStatus,startTime:_this.applyForm.startTime,endTime:_this.applyForm.endTime}).then(function (res){
          _this.reload();
        });
      });
    },
    openApply(){
      this.applyForm.houseId=this.lookForm.houseId;
      this.applyDialogVisible=true;
    },
    onSelected(data) {
      this.addForm.province = data.province.value;
      this.addForm.city = data.city.value;
      this.addForm.district = data.area.value;
    },
    upload(item){
      let file=item.file;
      const _this=this;
      const fd = new FormData()
      fd.append('picture', file);
      fd.append('houseId',this.houseId);
      const config = { headers: { 'Content-Type': 'multipart/form-data' }};
      axios.post('picture/addPicture', fd, config);
    },
    insertHouse(houseName,housePrice,houseNote,houseType,houseArea,province,city,district,address,userId){
      const _this=this;
      axios.post("house/addHouse",{houseName:houseName,housePrice:housePrice,houseNote:houseNote,houseType:houseType,houseArea:houseArea,province:province,city:city,district:district,address:address,
      houseStatus:this.status,userId:userId}).then(function (res){
        //alert(res.data.houseId);
        _this.houseId=res.data.houseId;
        _this.$refs.upload.submit();
        _this.reload();
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    applyDialogClosed(){
      this.$refs.applyDialogVisible.resetFields();
    },
    updateDialogClosed(){
      this.$refs.updateDialogVisible.resetFields();
    },
    addDialogClosed(){
      this.$refs.addDialogVisible.resetFields();
    },
    lookHouse(houseId){
      const _this=this;
      axios.get("house/getHouse",{params:{houseId:houseId}}).then(function (res){
        _this.lookForm=res.data;
      });
      axios.get("picture/queryPicture",{params:{houseId:houseId}}).then(function (res){
        _this.lookPicture=res.data;
      });
      this.lookDialogVisible=true;
    },
    goInsertPage(){
      const _this=this;
      axios.get("user/beforeUpdate",{params:{userName:this.userName}}).then(function (res){
        _this.addForm.userId=res.data.userId;
      });
      this.addDialogVisible=true;
    },
    goUpdate(houseId){
      const _this=this;
      axios.get("house/getHouse",{params:{houseId:houseId}}).then(function (res){
        _this.updateForm=res.data;
      });
      axios.get("picture/queryPicture",{params:{houseId:houseId}}).then(function (res){
        _this.updatePicture=res.data;
      });
      this.updateDialogVisible=true;
    },
    deleteHouse(houseId){
      const _this=this;
      axios.delete("house/deleteHouse",{params:{houseId:houseId}}).then(function (res){
        _this.reload();
      });
    },
    deleteList(){
      this.search='';
      this.queryList();
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
      axios.get("house/queryHouseList",{params:{pageNum:this.pageNum,pageSize:this.pageSize,userId:this.userId,houseName:this.search}}).then(function (res){
        _this.form=res.data.list;
        _this.total=res.data.total;
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    findUserId(){
      const _this=this;
      axios.get("user/beforeUpdate",{params:{userName:this.userName}}).then(function (res){
        _this.addId=res.data.userId;
        });
    }
  },
  created() {
    const _this=this;
    this.queryList();
    this.userName=window.sessionStorage.getItem('userName');
    this.findUserId();
  },
  data(){
    return{
      applyForm:{
        houseId:'',
        userId:'',
        applyStatus:'未处理',
        startTime:'',
        endTime:'',
      },
      select: {
        province: '省',
        city: '市',
        area: '区'
      },
      //addId:'',
      houseId:'0',
      userName:'',
      file: {},
      status:'未出租',
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      updateDialogVisible:false,
      addDialogVisible:false,
      lookDialogVisible:false,
      applyDialogVisible:false,
      userId:'',
      total:'',
      pageSize:'5',
      pageNum:'1',
      search:'',
      form:{
        houseId:'',
        houseName:'',
        housePrice:'',
        houseStatus:'',
        houseNote:'',
        houseType:'',
        userId:'',
        houseArea:'',
        province:'',
        city:'',
        district:'',
        address:''
      },
      addForm:{
        houseId:'',
        houseName:'',
        housePrice:'',
        houseStatus:'',
        houseNote:'',
        houseType:'',
        userId:'',
        houseArea:'',
        province:'',
        city:'',
        district:'',
        address:''
      },
      updateForm:{
        houseId:'',
        houseName:'',
        housePrice:'',
        houseStatus:'',
        houseNote:'',
        houseType:'',
        userId:'',
        houseArea:'',
        province:'',
        city:'',
        district:'',
        address:''
      },
      lookForm:{
        houseId:'',
        houseName:'',
        housePrice:'',
        houseStatus:'',
        houseNote:'',
        houseType:'',
        userId:'',
        houseArea:'',
        province:'',
        city:'',
        district:'',
        address:''
      },
      lookPicture:{
        pictureId:'',
        houseId:'',
        pictureUrl:''
      },
      updatePicture:{
        pictureId:'',
        houseId:'',
        pictureUrl:''
      }
    }
  }
}
</script>
<style scoped>
</style>
