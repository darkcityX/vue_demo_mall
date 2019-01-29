<template>
    <div class="cart">
        <!-- 1、定边栏 -->
        <div class="navbar-div">
            <van-nav-bar 
                title="购物车"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"/> 
        </div>

        <!-- 2、显示购物车中的商品 -->
        <div class="cart-list">
            <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
                <!-- img -->
                <div class="pang-img">
                    <img :src="item.image" width="100%" />
                </div>
                <!-- name、num -->
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.Name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count" />
                    </div>
                    <div class="itemPrice">
                        <span class="pang-goods-price">单价：￥{{ item.price | moneyFilter }}</span>
                        <span class="pang-goods-price">总价：￥{{ (item.price * item.count) | moneyFilter }}</span>
                    </div>
                </div>
                
            </div>            
        </div>
        <div class="totalMoney">
            商品总价：￥ {{totalMoney | moneyFilter}}
        </div>

        <!-- 3、底部btns -->
        <div class="cart-bottom">
            <div>
                <van-button size="large" type="primary" @click="clearCart()">清空</van-button>
            </div>
            <div>
                <van-button size="large" type="danger">付款</van-button>
            </div>
        </div>


    </div>
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js'; 

    export default {
        data () {
            return {
                isEmpty : false,  // 购物车是否为空： 不为空 true; 为空 false
                cartInfo: [],     // 购物车列表
                totalMoney: 0
            }
        },
        created(){
            // 调用获取购物车商品信息
            this.getCartInfo();
        },  
        filters: {
            moneyFilter(money){
                return toMoney(money);
            }                 
        },      
        methods:{
            onClickLeft(){ // 回退按钮函数
                this.$router.back(-1);
            },
            getCartInfo(){ // 获取购物车商品信息
                if( localStorage.cartInfo ){
                    this.cartInfo = JSON.parse( localStorage.cartInfo );
                }

                this.isEmpty = this.cartInfo.length > 0 ? true : false;
            },
            clearCart(){ // 清空购物车
                localStorage.removeItem("cartInfo");
                this.cartInfo = [];
            }
        },

    }
</script>

<style scoped>
    /* 头部顶边栏 */
    .navbar-div{
        margin-bottom: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    /* 列表 */
    .cart-list{
        background-color: #fff;
    }
    .pang-row{
        display: flex;
        flex-direction: row;
        flex-wrap:nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;
    }
    .pang-img{
        flex:6;
    }
    .pang-text{
        flex:14;
        padding-left:10px;
        box-sizing: border-box;
    }
    .pang-goods-name{
        padding-top: 10px;
        text-align: left;
    }
    .pang-control{
        padding-top: 10px;
        text-align: right;
    }
    .itemPrice{
        padding-top: 10px;
        line-height: 2;
        text-align: left;
    }
    .totalMoney{
        text-align: right;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding: 5px;
    }

    /* 底部按钮 */
    .cart-bottom{
        position: fixed;
        bottom:0px;
        left:0px;
        background-color: #f5f5f5;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
        border-top: 1px solid #e5e5e5;
        box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
    }
    .cart-bottom > div{
        flex:1;
        padding:5px;
    }
</style>
