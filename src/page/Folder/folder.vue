<template>
        <el-container>
            <el-header>文件共享</el-header>
            <el-row>
                <el-col :span="4">
                    <left-aside></left-aside>
                </el-col>
                <el-col :span="20">
                    <el-container>
                        <el-header>
                            <div id="catalog" class="btn-group"  v-for="(item, index) in btnList"
                                    :key="index">
                                <el-button  @click="btnShow(index)" >{{item===''||item==='/'?'根目录':item}}</el-button>
                            </div>
                            <div class="btn-head custom-file-input">
                                <el-upload
                                        class="upload-demo"
                                        :action="uploadUrl()"
                                        :on-change = 'handleUploadChange'
                                        :on-success="handleUploadSuccess"
                                        ref="upload">
                                    <el-button size="small" type="primary" class="upload-btn">点击上传</el-button>
                                </el-upload>

                            </div>
                            <div class="btn-group">
                                <el-button  @click="dialogVisible = true">新建文件夹</el-button>
                            </div>
                            <el-dialog
                                    title="新建文件夹"
                                    :visible.sync="dialogVisible"
                                    width="50%"
                                 >
                                     <el-input v-model="inpuVal" placeholder="输入文件夹" id="file-name"></el-input>
                                    <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="addFloder">确 定</el-button>
                                  </span>
                            </el-dialog>
                            <div class="btn-group btn-div" v-show="isShowDiv">
                                <el-button v-bind:fileUrl="fileUrl" id="fileDownload" class="btn-float" @click="downloadFile"><i class="el-icon-download"></i></el-button>
                                <el-button id="" class="btn-float"><i class="el-icon-success"></i></el-button>
                                <el-button id="" class="btn-float"><i class="el-icon-view"></i></el-button>
                                <el-button id="" class="btn-float"><i class="el-icon-remove"></i></el-button>
                            </div>
                        </el-header>
                        <el-main >
                            <el-row>
                                <el-col  :xs="12" :sm="4" :md="4" :lg="2" class="a-dir" v-for="(dir,index) of dirList"
                                         @click.native="toSubDir(dir)"
                                        :key="index"
                                                                    >
                                    <a href="#"  >
                                        <img src="../../images/folder.png" alt=""/>
                                        <div class="gallery-title">{{dir}}</div>
                                    </a>
                               </el-col>
                                 <el-col :xs="12":sm="4" :md="4" :lg="2" class="a-file" v-for="(file,index) of fileList"
                                    @click.native="bindFile(file)"
                                    :key="index">
                                    <a href="#"  >
                                        <img v-if="checkFile(file)" src="../../images/txt.png" alt=""/>
                                        <img v-else src="../../images/unknown.png" alt=""/>
                                        <div class="gallery-title">{{file}}</div>
                                    </a>
                                </el-col>
                            </el-row>
                        </el-main>
                    </el-container>
                    <el-main></el-main>
                </el-col>
            </el-row>
        </el-container>
</template>


<script>
    import leftAside from '../../components/common/aside'
    export default {
            data () {
                return{
                    dialogVisible:false,
                    btnList:[''],
                    dirList:{},
                    fileList:{},
                    isTxt:true,
                    split_path:'',
                    inpuVal:'',
                    isShowDiv:false,
                    fileUrl : '',
                }
             },
            components:{
                leftAside
            },
            created () {
                this.showFile()
              },
             methods: {
                 showFile(path){
                     if(!path) path='';
                     let url = '/index/Index/read?path='+path
                     this.$api.get(url,null,r=>{
                     },r=>{
                     this.dirList = r.dir
                     this.fileList = r.file
                 })
                 },
                 checkFile(filename){
                     let flag = false
                     let arr = ['txt','TXT']
                     var extend_name = filename.substring(filename.lastIndexOf(".")+1)
                     for(let i=0;i<arr.length;i++){
                         if(arr[0]===extend_name){
                             flag =  true;
                             break
                         }
                     }
                     return flag
                 },
                 toSubDir(dir){//进去子目录
                     //更新btnList
                     this.btnList.push(dir)
                     //得到路径
                     let path_url = this.getPathUrl()
                     this.showFile(path_url)

                     //更新showFile
                 },
                 getPathUrl(){//得到路径
                     let path_url = ''
                     for(let i=0;i<this.btnList.length;i++){
                         path_url += this.btnList[i]+'/'
                     }
                     return path_url
                 },
                 btnShow(index){//显示btn的
                     // 0 1 2 3
                     console.log(this.btnList);
                     var len =this.btnList.length
                     this.btnList.splice(index+1,len-1)
                     let path_url = this.getPathUrl()
                     this.showFile(path_url)
                 },
                 addFloder(){
                       let filename = this.inpuVal;
                       console.log(filename);
                       let path = this.getPathUrl()
                       let url ='/index/Index/create'
                       let params = {}
                        params.name = filename
                        params.dir = this.getPathUrl()
                        this.$api.post(url,params,r=>{
                        },r=>{
                            this.showFile(path)
                            this.dialogVisible = false
                        })
                },
                 uploadUrl(){
                     return '/index/Index/upload?path='+this.getPathUrl()
                 },
                 handleUploadChange(){
                     this.$refs.upload.submit()
                 },
                 handleUploadSuccess(){
                     let path = this.getPathUrl()
                     this.showFile(path)
                 },
                 bindFile(file){
                     this.isShowDiv = true
                     let path = this.getPathUrl()
                     this.fileUrl = path+file
                 },
                 downloadFile(){
                     console.log(this.fileUrl)
                     window.open('/index/Index/download?file=' + this.fileUrl)
                 }
             }
    }
</script>

<style scoped>
    .btn-group{
        width: 100px;
        float: left;
        margin-right: 20px;
    }
    .btn-head{
        width: 150px;
        float: left;
        margin-right: 20px;
    }
    .custom-file-input{
        position: relative;
    }
    .file{
        width: 120px;
        height: 36px;
        position: absolute;
        top: 0;
        left: 0;
        z-index:100;
        -moz-opacity: 0;
        -ms-opacity: 0;
        -webkit-opacity: 0;
        opacity: 0;  /*css属性——opcity不透明度，取值0-1*/
        filter: alpha(opacity=0); /*兼容IE8及以下--filter属性是IE特有的，它还有很多其它滤镜效果，而filter: alpha(opacity=0); 兼容IE8及以下的IE浏览器(如果你的电脑IE是8以下的版本，使用某些效果是可能会有一个允许ActiveX的提示,注意点一下就ok啦)*/
        cursor: pointer;
    }
    .btn-float{
        float: left;
    }
    .btn-div{
        width: 300px;
    }
    .upload-btn{
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }

</style>
