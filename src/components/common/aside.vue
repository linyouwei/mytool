<template>
    <aside class="aside">
      <!--  <el-collapse accordion>
            <el-collapse-item  title="目录">
            </el-collapse-item>
            <el-collapse-item title="小工具">
                <div><a href="#">json格式化</a></div>
                <div><a  href="#">二维码</a></div>
                <div><a  href="#">http</a></div>
            </el-collapse-item>
        </el-collapse>-->
        <el-row class="tac" >
            <el-col :span="24">
                <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"@close="handleClose">

                <router-link to='/' tag='a'><el-submenu index="1">
                        <template slot="title">
                           目录
                        </template>
                    </el-submenu></router-link>
                    <el-submenu index="2">
                        <template slot="title">
                            <span>小工具</span>
                        </template>
                        <el-menu-item index="1">
                            <el-menu-item-group>
                                <router-link to='/json' tag='a'>
                                <el-menu-item index="2-1" >
                                    json格式化
                                </el-menu-item></router-link>
                                <router-link to='/qrcode' tag='a'>
                                <el-menu-item index="2-2">
                                    二维码
                                </el-menu-item>
                                </router-link>
                                <router-link to='/qrcode' tag='a'>
                                <el-menu-item index="2-3">
                                    <!--<router-link to='/http' tag='a'>http</router-link>-->
                                </el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </aside>
</template>
<script>
    export default {
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
