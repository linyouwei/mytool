<template>
    <el-container>
        <el-header>文件共享</el-header>
        <el-row>
            <el-col :span="4">
                <left-aside></left-aside>
            </el-col>
            <el-col :span="20">
                <el-container>
                    <el-main >
                       <div id="top">
                            <span style="float:right;">
                                <el-button type="text" @click="add" style="color:white">添加</el-button>
                                <el-button type="text" @click="deletenames" style="color:white">批量删除</el-button>
                                <el-button type="text" @click="printTable" style="color:white">打印</el-button>
                              </span>
                       </div>
                        <div style="margin-top: 15px">
                            <el-input placeholder="请输入内容" v-model="criteria" style="padding-bottom:10px;">
                                <el-select v-model="select" slot="prepend" placeholder="请选择">
                                    <el-option label="id" value="1"></el-option>
                                    <el-option label="name" value="2"></el-option>
                                </el-select>
                                <el-button slot="append" icon="search" v-on:click="search">搜索</el-button>
                            </el-input>
                            <div id="subOutputRank-print" >
                            <el-table
                                    :data="tableData"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange"
                                    @row-click="handleclick"
                                    :row-class-name="tableRowClassName">
                                <el-table-column
                                        type="selection"
                                        width="55"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="id"
                                        label="Id"
                                        sortable
                                        show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="日期"
                                        width="180"
                                        align="center"
                                        >
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="姓名"
                                        width="180"
                                        align="center">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="地址"
                                        align="center">
                                </el-table-column>
                                <el-table-column label="操作"
                                                 align="center">
                                    <template slot-scope="scope">
                                        <!--el-table-column内的template是传递给其内部solt的显示内容，
                                        但是scope的值是由el-table-column内部solt绑定的数据返回的。-->
                                        <el-button
                                                size="small"
                                                type="primary"
                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                        <el-button
                                                size="small"
                                                type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            </div>
                        </div>
                        <div align="center">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 15, 20]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount">
                            </el-pagination>
                        </div>
                    </el-main>
                </el-container>
            </el-col>
         </el-row>
    </el-container>
</template>


<script>
    import leftAside from '../../components/common/aside'
    export default {
        data(){
            return {
                tableData:[],
                //多选数组
                multipleSelection: [],
                pagesize: 5,
                //当前页码
                currentPage: 1,
                //默认数据总数
                totalCount: 100,
                //下拉菜单选项
                select: '',
                //默认高亮行数据id
                highlightId: -1,
                //查询的页码
                start: 1,
                criteria:''

            }
        },
        created(){

        },
        mounted(){
            this.$http.get('static/tableData.json').then(res => {
                this.tableData =eval('(' + res.bodyText + ')')
            })
         },

        components:{
            leftAside
        },
        methods:{
            //多选响应
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
//                console.log(val)
            },

            //点击行响应
            handleclick: function(row, event, column){

                this.highlightId = row.id;
            },
            //改变当前点击的行的class，高亮当前行
            tableRowClassName: function(row, index){
                console.log('----')
                console.log(row.id)
                console.log('----')
                if(row.id == this.highlightId)
                {
                    return 'info-row';
                }
            },
            handleEdit:function(index,row){
                console.log(index,row)

            },
            handleDelete:function(index,row){

            },
            add:function(){

            },
            search: function(){
            },
            //多项删除
            deletenames:function(){

            },
            //改变当前点击的行的class，高亮当前行
            tableRowClassName: function(row, index){

            },
            handleSizeChange:function(val){

            },
            //每页显示数据量变更
            handleSizeChange: function(val) {
                          },

            //页码变更
            handleCurrentChange: function(val) {
            },
            //打印
            printTable:function(){
                // 1.设置要打印的区域
                let subOutputRankPrint = document.getElementById('subOutputRank-print');
                console.log(subOutputRankPrint.innerHTML);
                let newContent =subOutputRankPrint.innerHTML;
                let oldContent = document.body.innerHTML;
                //2、复制给body，并执行window.print打印功能
                document.body.innerHTML = newContent;
                window.print();
                window.location.reload();
                // 3. 还原：将旧的页面储存起来，当打印完成后返给给页面。
                document.body.innerHTML = oldContent;
                return false;
            }


        }
    }


</script>

<style>
    .el-select .el-input {
        width: 110px;
    }

    .el-table .info-row {
        background: #c9e5f5;
    }

    #top {
        background:#20A0FF;
        padding:5px;
        overflow:hidden
    }
</style>