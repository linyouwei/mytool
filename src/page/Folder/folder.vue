<template>
    <div id="folder">
        <div id="doc" >
            <div id="doc-header" class="navbar">
                <div class="pull-left">
                    <ul class="menu-horizontal">
                        <li>
                            <a>文件共享</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="doc-body" class="row menu-open">
                <left-aside></left-aside>
                <div id="doc-center">
                    <div id="doc-center-head">
                        <div class="btn-toolbar">
                            <div id="catalog" class="btn-group">
                                <button type="button" class="btn-raised btn-primary " data-value="" disabled>根目录</button>
                            </div>
                            <div class="btn-group custom-file-input">
                                <form id="uploadForm" enctype="multipart/form-data">
                                    <button type="button" data-value="" class="btn-raised btn-primary">
                                        <i>选择要上传的文件</i></button>
                                    <input id="fileUpload" type="file" name="file" multiple="" class="file">
                                </form>
                            </div>
                            <div  class="btn-group">
                                <button type="button"data-toggle="modal" id="dirCreate" class="btn-raised btn-primary" data-target="#dirInput">
                                    <i class=""></i> 新建文件夹
                                </button>
                            </div>
                            <div class="btn-group" id="fileOperation" hidden="hidden">
                                <button type="button" class="btn-raised btn-primary" id="fileDownload"><i class="glyphicon glyphicon-download"></i></button>
                                <button type="button" class="btn-raised btn-primary" data-am-modal="{target: '#myQrcode'}" id="fileQrcode"><i class="glyphicon glyphicon-qrcode"></i></button>
                                <button type="button" class="btn-raised btn-primary" data-am-modal="{target: '#my-popup'}" id="filePreview"><i class="glyphicon glyphicon-eye-open"></i></button>
                                <button type="button" class="btn-raised btn-primary" id="fileRemove"><i class="glyphicon glyphicon-remove"></i></button>
                            </div>
                        </div>
                    </div>
                    <div id="container"></div>
                </div>
            </div>
        </div>
        <!--新建文件夹-->
        <div class="modal fade" id="dirInput" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">新建文件夹</h4>
                    </div>
                    <div class="modal-body">
                        <input type="text" class="form-control" id="file-name">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" id="confirm">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
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
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
