<template>
    <div>
        <!-- 1、顶边栏 -->
        <div class="navbar-div">
            <van-nav-bar 
                title="商品详情页"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"/>
        </div>
        
        <!-- 2、大图展示 -->
        <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%" alt="">
        </div>

        <!-- 3、 -->
        <div class="goods-name">{{goodsInfo.NAME}}</div>
        <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilter}}</div>
        
        <div>
            <van-tabs swipeable animated sticky>
                <van-tab title="商品详情">
                    <div class="detail" v-html="goodsInfo.DETAIL"></div>
                </van-tab>
                <van-tab title="评价">
                    正在制作中
                </van-tab>
            </van-tabs>
        </div>

        <!-- 5、底部购物车 -->
        <div class="goods-bottom">
            <div>
                <van-button size="large" type="primary" @click="addCart()">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import { Toast } from 'vant'

    import Url from '@/serviceAPI.config.js';

    import {toMoney} from '@/filter/moneyFilter.js'; 
    export default {
        data () {
            return {
                goodsId: '',
                goodsInfo: []
            }
        },
        filters: {
            moneyFilter(money){
                return toMoney(money);
            }           
        },
        created(){
            // 接收路由传过来的参数
            this.goodsId = 
                this.$route.query.goodsId ? this.$route.query.goodsId 
                    : this.$route.params.goodsId ? this.$route.params.goodsId 
                    : localStorage.getItem("goodId");
            localStorage.setItem("goodId",this.goodsId);

            // 调用商品详情接口
            this.getInfo();
        },
        methods: {
            getInfo(){
                axios({
                    url: Url.getDetailsInfo,
                    method: 'get',
                })
                .then(res=>{
                    if( res.status == "200"){
                        console.log( res );
                        let lock = true;
                        for( let i = 0 ; i < res.data.length ; i++ ){
                            if( this.goodsId == res.data[i].ID ){
                                console.log( "1111" );
                                this.goodsInfo = res.data[i];
                                lock = false;
                            }
                        }
                        if( lock ){
                            alert("数据库中暂未有该商品详情信息!商品goodsId："+this.goodsId);
                            this.$router.push('/index');
                        }
                        console.log( this.goodsInfo );                        
                    }

                })
                .catch(err=>{
					console.log("数据请求失败");
                })
            },
            onClickLeft(){
                this.$router.go(-1);
            },
            addCart(){ // 向购物车中添加商品
                // 首先判断登陆状态：已登录则继续，未登陆则跳转到登陆页面
                if( localStorage.getItem("userInfo") ){
                    // 判断localStorage购物车信息并取出
                    let cartInfo = localStorage.cartInfo ? JSON.parse( localStorage.getItem("cartInfo") ) : [];

                    // 判断购物车内是否有该商品 // undefined表示没有
                    let isHaveGoods = cartInfo.find(cart=>cart.goodsId==this.goodsId);
                    console.log( "购物车内是否有该商品：" + isHaveGoods );
                    if( !isHaveGoods ){
                        // 如果没有重组对象，存入本地
                        let newGoodsInfo={
                            goodsId:this.goodsInfo.ID,
                            Name:this.goodsInfo.NAME,
                            price:this.goodsInfo.PRESENT_PRICE,
                            image:this.goodsInfo.IMAGE1,
                            count:1
                        } 
                        cartInfo.push( newGoodsInfo ); 
                        localStorage.cartInfo = JSON.stringify( cartInfo );  
                        Toast({
                            message : "添加成功！",
                            type :  "success"
                        });
                        
                    }else{
                        Toast({
                            message : "添加失败！购物车中已有该商品！",
                            type: "fail"
                        }); 
                    }


                }else{
                    Toast({
                        message: "还未登陆，请先登陆!",
                        type: "fail",
    					mask : false,
						position : "middle",
						forbidClick : true,
						duration : 3000
                    });
                    const timer = setInterval(() => {
                        this.$router.push('/login');
						clearInterval(timer);
					}, 3000);  
                }
            }
        }
    }
</script>

<style scoped>
    .detail{
        font-size:0px;
    }
    .goods-name{
        background-color: #fff;
    }
    .goods-price{
        background-color: #fff;
    }
    .goods-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #f5f5f5;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
        border-top: 1px solid #e5e5e5;
    }
    .goods-bottom > div{
        flex:1;
        padding:5px;
    }
</style>



