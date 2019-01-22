<template>
    <!-- 公共组件：商品信息列表
            **：index页面，列表页，其它页面商品信息共用
            * 接收参数：   
            * goodImgUrl：
            * goodName：
            * goodPrice：
    -->
    <div class="hot-goods-info">
        <div class="goods-image">
            <img v-lazy="goodImgUrl" width="90%" />
        </div>
        <div class="goods-name">{{goodName}}</div>
        <div class="goods-price">￥{{goodPrice | moneyFilter}}</div>
    </div>
</template>

<script>
    import {toMoney} from '@/filter/moneyFilter.js' 

    export default {
        data () {
            return {
                
            }
        },
        props: ['goodImgUrl','goodName','goodPrice'],
        watch: {

        },
        filters: {
            moneyFilter(money){
                return toMoney(money);
            }
        }
    }
</script>

<style scoped>
    .goods-name{
        padding: 0 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap; 
    }
</style>


