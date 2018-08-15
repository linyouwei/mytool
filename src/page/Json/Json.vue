<template>
        <el-container>
            <el-header>文件共享</el-header>
            <el-row>
                <el-col :span="4">
                    <left-aside></left-aside>
                </el-col>
                <el-col :span="20">
                    <el-container>
                        <el-main>
                           <el-input
                                   type="textarea"
                                   :rows="5"
                                   placeholder="输入json数据"
                                   v-model="textareas"
                                   @blur="toFormat()"
                                   >
                           </el-input>
                            <el-col :span="5">
                                <pre id="editor" v-html="jsonResult" ></pre>
                            </el-col>
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
                    textareas:'',
                    jsonResult:""
                }
             },
            components:{
                leftAside
            },
            methods:{
                toFormat(){
                    let text = this.textareas
                    console.log(text)
                    //格式化
                    var temp = '';
                    var count = 0;//计算\t的个数
                    var brace_cout = 0;//计算{的个数
                    function output(data) {
                        var start = data.indexOf("{");
                        //"b":123
                        if (start == -1) {
                            temp = data.substring(data.indexOf(":") + 1)
                            return temp;
                        } else {
                            var end = data.lastIndexOf("}")
                            var tempData = data.substring(start + 1, end)
                            //从tempData中截取:前面的数值。
                            var contentIndex = tempData.indexOf(":")
                            var content = tempData.substring(1, contentIndex + 1)
                            count++
                            var space = ''
                            for (var j = 0; j < count; j++) {
                                space += "\t"
                            }
                            var brace_space = ''
                            if (brace_cout) {
                                for (var i = 0; i < brace_cout; i++) {
                                    brace_space += '\t'
                                }
                                brace_space += '}'
                            } else {
                                brace_space = '}'
                            }
                            brace_cout++;
                            //拼接{ }s
                            temp = "{<br/>" + space + content + output(tempData) + "<br/>" + brace_space
                            return temp
                        }
                    }
                    this.jsonResult = output(text)
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
