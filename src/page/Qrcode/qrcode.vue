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
                            <el-button @click="getData">点击上传</el-button>
                        </el-header>
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

                }
             },
            components:{
                leftAside
            },
            methods:{
                getData(){
                    this.$http.get('static/china.json').then(res => {
                        console.log(res.bodyText)//此处的res对象包含了json的文件信息和数据，我们需要的json数据存在于body属性中

                })
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

</style>
