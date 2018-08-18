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
                        <div class="page-shopping-cart" id="shopping-cart">
                            <h4 class="cart-title">购物清单</h4>
                            <div class="cart-product-title clearfix">
                                <div class="td-check fl"><span class="check-span"  :class="{'check-true':isSelectAll}" @click="selectProduct(isSelectAll)"></span></div>
                                <div class="td-product fl">商品</div>
                                <div class="td-num fl">数量</div>
                                <div class="td-price fl">单价(元)</div>
                                <div class="td-total fl">金额(元)</div>
                                <div class="td-do fl">操作</div>
                            </div>
                            <div class="cart-product clearfix">
                                <table>
                                    <tr v-for="item in productList">
                                        <td class="td-check"><span class="check-span" @click="item.select=!item.select" :class="{'check-true':item.select}"></span></td>
                                        <td class="td-product"><img :src="item.pro_img" width="98" height="98">
                                            <div class="product-info">
                                                <h6>{{item.pro_name}}</h6>
                                                <p>品牌：{{item.pro_brand}}&nbsp;&nbsp;产地：{{item.pro_place}}</p>
                                                <p>规格/纯度:{{item.pro_purity}}&nbsp;&nbsp;起定量：{{item.pro_min}}</p>
                                                <p>配送仓储：{{item.pro_depot}}</p>
                                            </div>
                                            <div class="clearfix"></div>
                                        </td>
                                        <td class="td-num">
                                            <div class="product-num">
                                                <a href="javascript:;" class="num-reduce num-do fl" @click="item.pro_num--"><span>-</span></a>
                                                <input type="text" class="num-input" v-model="item.pro_num">
                                                <a href="javascript:;" class="num-add num-do fr" @click="item.pro_num++"><span>+</span></a>
                                            </div>
                                        </td>
                                        <td class="td-price">
                                            <p class="red-text">￥<span class="price-text">{{item.pro_price.toFixed(2)}}</span></p>
                                        </td>
                                        <td class="td-total">
                                            <p class="red-text">￥<span class="total-text">{{item.pro_price*item.pro_num}}</span>.00</p>
                                        </td>
                                        <td class="td-do"><a href="javascript:;" class="product-delect">删除</a></td>
                                    </tr>

                                </table>
                            </div>
                            <div class="cart-product-info">
                                <a class="delect-product" href="javascript:;" @click="deleteProduct"><span></span>删除所选商品</a>
                                <a class="keep-shopping" href="#"><span></span>继续购物</a>
                                <a class="btn-buy fr" href="javascript:;">去结算</a>
                                <p class="fr product-total">￥<span>{{getTotal.totalPrice}}</span></p>
                                <p class="fr check-num"><span>{{getTotal.totalNum}}</span>件商品总计（不含运费）：</p>
                            </div>
                            <div class="cart-worder clearfix">
                                <a href="javascript:;" class="choose-worder fl"><span></span>绑定跟单员</a>
                                <div class="worker-info fl">
                                </div>
                            </div>
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
                productList:[
                    {
                        'pro_name': '产品一',//产品名称
                        'pro_brand': 'skc',//品牌名称
                        'pro_place': '韩国',//产地
                        'pro_purity': '99.7%',//规格
                        'pro_min': "215千克",//最小起订量
                        'pro_depot': '上海仓海仓储',//所在仓库
                        'pro_num': 3,//数量
                        'pro_img': '../../images/logo.png',//图片链接
                        'pro_price': 800//单价
                    },
                    {
                        'pro_name': '产品二',//产品名称
                        'pro_brand': 'skc',//品牌名称
                        'pro_place': '韩国',//产地
                        'pro_purity': '99.7%',//规格
                        'pro_min': "215千克",//最小起订量
                        'pro_depot': '上海仓海仓储',//所在仓库
                        'pro_num': 3,//数量
                        'pro_img': '../../images/ucenter/testimg.jpg',//图片链接
                        'pro_price': 800//单价
                    },
                    {
                        'pro_name': '产品三',//产品名称
                        'pro_brand': 'skc',//品牌名称
                        'pro_place': '韩国',//产地
                        'pro_purity': '99.7%',//规格
                        'pro_min': "215千克",//最小起订量
                        'pro_depot': '上海仓海仓储',//所在仓库
                        'pro_num': 3,//数量
                        'pro_img': '../../images/ucenter/testimg.jpg',//图片链接
                        'pro_price': 800//单价
                    }
                ]
            }
        },
        created(){

        },
        computed:{
            isSelectAll:function(){
                var checkArr =  function(arr){
                    var flag = true
                    for(let i=0;i<arr.length;i++){
                        if(!arr[i].select) flag=false
                    }
                    return flag
                }
                return checkArr(this.productList)


//               return this.productList.every(function (val) { return val.select})
            },
            getTotal:function(){
                //获取productList中select为true的数据。
          /*      var _proList=this.productList.filter(function (val) { return val.select}),totalPrice=0;
                for(var i=0,len=_proList.length;i<len;i++){
                    //总价累加
                    totalPrice+=_proList[i].pro_num*_proList[i].pro_price;
                }
                console.log(_proList)
                //选择产品的件数就是_proList.length，总价就是totalPrice
                return {totalNum:_proList.length,totalPrice:totalPrice}*/
                var _proList = this.filterSelect(this.productList)
                var totalPrice = 0
                for(var i=0,len=_proList.length;i<len;i++){
                    //总价累加
                    totalPrice+=_proList[i].pro_num*_proList[i].pro_price;
                }
                return {totalNum:_proList.length,totalPrice:totalPrice}

            },

            selectProduct:function(_isSelect){
                //遍历productList,全部取反
                for(var i=0;i<this.productList;i++){}
                    this.productList[i].select = !this.productList[i].select;
            }

        },
        mounted(){
            var _this = this;
            this.productList.map(function(item){
                _this.$set(item,'select',true);
            })

        },
    components:{
        leftAside
    },
    methods:{
        deepClone(obj){
                let _obj = JSON.stringify(obj),
                        objClone = JSON.parse(_obj);
                return objClone
        },
        filterSelect(arr){
//            var _proList2 = arr  不能这么写，这是浅拷贝
            var _proList2 = this.deepClone(arr)
            //过滤掉select为false的值
            for(var i=_proList2.length-1;i>=0;i--){
                if(!_proList2[i].select) _proList2.splice(i,1)
            }
            console.log(this.productList)
            return _proList2
        },
        //删除已经选中(select=true)的产品
        deleteProduct:function(){
                this.productList = this.productList.filter(function(val){
                    return !val.select
                })

        }



    }
    }


</script>

<style scoped>
.fl{
    float: left;
}
.fr{
    float: right;
}
blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, img, input, li, ol, p, table, td, textarea, th, ul {
    margin: 0;
    padding: 0;
}
.clearfix{
    zoom: 1;
}
.clearfix:after {
    clear: both;
}
.clearfix:after {
    content: '.';
    display: block;
    overflow: hidden;
    visibility: hidden;
    font-size: 0;
    line-height: 0;
    width: 0;
    height: 0;
}
a{
    text-decoration: none;
    color: #333;
}
img{vertical-align: middle;}
.page-shopping-cart {
    width: 1200px;
    margin: 50px auto;
    font-size: 14px;
    border: 1px solid #e3e3e3;
    border-top: 2px solid #317ee7; }
.page-shopping-cart .cart-title {
    color: #317ee7;
    font-size: 16px;
    text-align: left;
    padding-left: 20px;
    line-height: 68px; }
.page-shopping-cart .red-text {
    color: #e94826; }
.page-shopping-cart .check-span {
    display: block;
    width: 24px;
    height: 20px;
    background-color: #ddd;
}
.page-shopping-cart .check-span.check-true {
    background-color: red;
}
.page-shopping-cart .td-check {
    width: 70px; }
.page-shopping-cart .td-product {
    width: 460px; }
.page-shopping-cart .td-num, .page-shopping-cart .td-price, .page-shopping-cart .td-total {
    width: 160px; }
.page-shopping-cart .td-do {
    width: 150px; }
.page-shopping-cart .cart-product-title {
    text-align: center;
    height: 38px;
    line-height: 38px;
    padding: 0 20px;
    background: #f7f7f7;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3; }
.page-shopping-cart .cart-product-title .td-product {
    text-align: center;
    font-size: 14px; }
.page-shopping-cart .cart-product-title .td-check {
    text-align: left; }
.page-shopping-cart .cart-product-title .td-check .check-span {
    margin: 9px 6px 0 0; }
.page-shopping-cart .cart-product {
    padding: 0 20px;
    text-align: center; }
.page-shopping-cart .cart-product table {
    width: 100%;
    text-align: center;
    font-size: 14px; }
.page-shopping-cart .cart-product table td {
    padding: 20px 0; }
.page-shopping-cart .cart-product table tr {
    border-bottom: 1px dashed #e3e3e3; }
.page-shopping-cart .cart-product table tr:last-child {
    border-bottom: none; }
.page-shopping-cart .cart-product table .product-num {
    border: 1px solid #e3e3e3;
    display: inline-block;
    text-align: center; }
.page-shopping-cart .cart-product table .product-num .num-do {
    width: 24px;
    height: 28px;
    display: block;
    background: #f7f7f7; }
.page-shopping-cart .cart-product table .product-num .num-reduce span {
    /*background: url("../../images/shopping_cart.png") no-repeat -40px -22px;*/
    display: block;
    width: 6px;
    height: 2px;
    margin: 13px auto 0 auto; }
.page-shopping-cart .cart-product table .product-num .num-add span {
    /*background: url("../../images/shopping_cart.png") no-repeat -60px -22px;*/
    display: block;
    width: 8px;
    height: 8px;
    margin: 10px auto 0 auto; }
.page-shopping-cart .cart-product table .product-num .num-input {
    width: 42px;
    height: 28px;
    line-height: 28px;
    border: none;
    text-align: center; }
.page-shopping-cart .cart-product table .td-product {
    text-align: left;
    font-size: 12px;
    line-height: 20px; }
.page-shopping-cart .cart-product table .td-product img {
    border: 1px solid #e3e3e3;
    margin-right: 10px; }
.page-shopping-cart .cart-product table .td-product .product-info {
    display: inline-block;
    vertical-align: middle; }
.page-shopping-cart .cart-product table .td-do {
    font-size: 12px; }
.page-shopping-cart .cart-product-info {
    height: 50px;
    line-height: 50px;
    background: #f7f7f7;
    padding-left: 20px; }
.page-shopping-cart .cart-product-info .delect-product {
    color: #666; }
.page-shopping-cart .cart-product-info .delect-product span {
    display: inline-block;
    vertical-align: top;
    margin: 18px 8px 0 0;
    width: 13px;
    height: 15px;
    background: url("../../images/shopping_cart.png") no-repeat -60px 0; }
.page-shopping-cart .cart-product-info .product-total {
    font-size: 14px;
    color: #e94826; }
.page-shopping-cart .cart-product-info .product-total span {
    font-size: 20px; }
.page-shopping-cart .cart-product-info .check-num {
    color: #333; }
.page-shopping-cart .cart-product-info .check-num span {
    color: #e94826; }
.page-shopping-cart .cart-product-info .keep-shopping {
    color: #666;
    margin-left: 40px; }
.page-shopping-cart .cart-product-info .keep-shopping span {
    display: inline-block;
    vertical-align: top;
    margin: 18px 8px 0 0;
    width: 15px;
    height: 15px;
    background: url("../../images/shopping_cart.png") no-repeat -40px 0; }
.page-shopping-cart .cart-product-info .btn-buy {
    height: 50px;
    color: #fff;
    font-size: 20px;
    display: block;
    width: 110px;
    background: #ff7700;
    text-align: center;
    margin-left: 30px; }
.page-shopping-cart .cart-worder {
    padding: 20px; }
.page-shopping-cart .cart-worder .choose-worder {
    color: #fff;
    display: block;
    background: #39e;
    width: 140px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    margin-right: 20px; }
.page-shopping-cart .cart-worder .choose-worder span {
    display: inline-block;
    vertical-align: top;
    margin: 9px 10px 0 0;
    width: 22px;
    height: 22px;
    background: url("../../images/shopping_cart.png") no-repeat -92px 0; }
.page-shopping-cart .cart-worder .worker-info {
    color: #666; }
.page-shopping-cart .cart-worder .worker-info img {
    border-radius: 100%;
    margin-right: 10px; }
.page-shopping-cart .cart-worder .worker-info span {
    color: #000; }

.choose-worker-box {
    width: 620px;
    background: #fff; }
.choose-worker-box .box-title {
    height: 40px;
    line-height: 40px;
    background: #F7F7F7;
    text-align: center;
    position: relative;
    font-size: 14px; }
.choose-worker-box .box-title a {
    display: block;
    position: absolute;
    top: 15px;
    right: 16px;
    width: 10px;
    height: 10px;
    background: url("../../images/shopping_cart.png") no-repeat -80px 0; }
.choose-worker-box .box-title a:hover {
    background: url("../../images/shopping_cart.png") no-repeat -80px -22px; }
.choose-worker-box .worker-list {
    padding-top: 30px;
    height: 134px;
    overflow-y: auto; }
.choose-worker-box .worker-list li {
    float: left;
    width: 25%;
    text-align: center;
    margin-bottom: 30px; }
.choose-worker-box .worker-list li p {
    margin-top: 8px; }
.choose-worker-box .worker-list li.cur a {
    color: #f70; }
.choose-worker-box .worker-list li.cur a img {
    border: 1px solid #f70; }
.choose-worker-box .worker-list li a:hover {
    color: #f70; }
.choose-worker-box .worker-list li a:hover img {
    border: 1px solid #f70; }
.choose-worker-box .worker-list li img {
    border: 1px solid #fff;
    border-radius: 100%;
}
</style>