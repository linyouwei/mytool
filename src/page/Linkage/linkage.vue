<template>
        <el-container>
            <el-header>文件共享</el-header>
            <el-row>
                <el-col :span="4">
                    <left-aside></left-aside>
                </el-col>
                <el-col :span="20">
                    <el-container>
                        <div>
                           <!-- <el-select v-model="province" placeholder="请选择"
                                    @change="choseProvince">
                                <el-option
                                        v-for="item in province"
                                        :key="item.id"
                                        >
                                </el-option>
                            </el-select>
                            <el-select v-model="city" placeholder="请选择">
                                <el-option
                                        v-for="item in city"
                                        :key="item.id"
                                        :label="item.value">
                                </el-option>
                            </el-select>-->
                        </div>
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
                    province:[],
                    city:[],
                    county:[],
                }
             },
            components:{
                leftAside
            },
            created () {
                    this.$http.get('static/province.json').then(res => {
                             this.province =eval('(' + res.bodyText + ')')
                             console.log(this.province)
                     })
                    this.$http.get('static/city.json').then(res => {
                            this.city =eval('(' + res.bodyText + ')')
                             console.log(this.city)
                    })
            },
             methods: {
                 choseProvince(){
                     //得到该省的id

                 }
             }
    }
</script>

<style scoped></style>
