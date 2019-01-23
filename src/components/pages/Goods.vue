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
                <van-button size="large" type="primary">加入购物车</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">直接购买</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    import Url from '@/serviceAPI.config.js';

    import {toMoney} from '@/filter/moneyFilter.js' 
    export default {
        data () {
            return {
                goodsId: '',
                goodsInfo: {}
            }
        },
        filters: {
            moneyFilter(money){
                return toMoney(money);
            }           
        },
        created(){
            // 接收路由传过来的参数
            this.goodsId = this.$route.query.goodsId
            console.log("传过来的参数为：" + this.goodsId );



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



