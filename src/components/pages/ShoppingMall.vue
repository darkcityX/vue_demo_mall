<template>
    <div>
        <!-- seacrh bar layout -->
        <div class="search-bar">
            <van-col span="3" class="icon iconfont icon-fenxiang"></van-col>
            <van-col span="16">
                <input class="search-input" type="text" placeholder="查找">
            </van-col>
            <van-col span="5">
                <van-button size="mini">查找</van-button>
            </van-col>            
        </div>

        <!-- swipwer area -->
        <div class="swiper-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img :src="banner.image" alt="" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>

        <!-- 小导航 -->
        <div class="type-bar">
            <div class="type-bar-item" v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" alt="">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>

        <!-- 广告位 -->
        <div class="ad-banner">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
        </div>
        
        <!-- 推荐商品 -->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                                <img :src="item.image" width="80%" />
                                <div>{{item.goodsName}}</div>
                                <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter }})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div> 

        <!--楼层模块-->
        <!-- 1、楼层1 -->
        <FloorComponent :floorData="floor1" :floorTitle="floorTitle.floor1" :index="1"></FloorComponent>
        <!-- 2、楼层2 -->
        <FloorComponent :floorData="floor2" :floorTitle="floorTitle.floor2" :index="2"></FloorComponent>
        <!-- 3、楼层3 -->
        <FloorComponent :floorData="floor3" :floorTitle="floorTitle.floor3" :index="3"></FloorComponent>               

        <!--Hot Area-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <!-- <GoodsInfoComponent :goodsInfoData="hotGoods"></GoodsInfoComponent> -->
                <van-list>
                    <van-row >
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <GoodsInfoComponent :goodImgUrl="item.image" :goodName="item.name" :goodPrice="item.price"></GoodsInfoComponent>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import Url from '@/serviceAPI.config.js'

    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

    import FloorComponent from '../component/FloorComponent.vue'
    import GoodsInfoComponent from '../component/GoodsInfoComponent'

    import {toMoney} from '@/filter/moneyFilter.js'



    export default {
        data() {
            return{
                // 轮播图
                bannerPicArray:[],
                // 小导航
                category: [],
                // 广告位
                adBanner: '',
                // 推荐商品
                swiperOption:{
                    slidesPerView: 3,
                },
                recommendGoods:[],

                // 楼层
                floorTitle: [],
                floor1: [],
                floor2: [],
                floor3: [],

                // 热销推荐
                hotGoods:[] //热卖商品
            }   
        },
        components: {
            swiper,
            swiperSlide,
            FloorComponent,
            GoodsInfoComponent
        },
        filters:{
            moneyFilter(money){
                return toMoney(money);
            }
        },
        created(){
            axios({
                url: Url.getShoppingMallIndexInfo,
                method: 'get'
            }).then(
                res=>{
                    if( res.status == "200" ){
                        console.log( '--------------------' );
                        console.log( res.data.data );
                        // 轮播
                        this.bannerPicArray = res.data.data.slides;
                        // 小导航
                        this.category = res.data.data.category;
                        // 广告位
                        this.adBanner = res.data.data.advertesPicture;
                        // 推荐商品
                        this.recommendGoods = res.data.data.recommend;
                        // 楼层
                        this.floorTitle = res.data.data.floorName;

                        this.floor1 = res.data.data.floor1;
                        this.floor2 = res.data.data.floor2;
                        this.floor3 = res.data.data.floor3;
                        // 热卖推荐
                        this.hotGoods = res.data.data.hotGoods;

                    }
                }
            ).catch(
                err=>{

                }
            )
        }
    }
</script>
<style scoped>
    .search-bar{
        height: 2.2rem;
        line-height: 2.2rem;
        background: #e5017d;
    }  
    .icon{
        font-size: 1.2rem;
    }
    .search-input{
        width: 100%;
        color: #fff;
        height: 1.3rem;
        border-top: 0px;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #e5e5e5;
        background-color: #e5017d; 
    } 
    /*---- swipwer area ----*/
    .swiper-area{
        clear:both;
        max-height:15rem;
        overflow: hidden;
    }
    /* .swiper-area img{
        max-height: 15rem;
    } */

    /*---- 小导航 ----*/
    .type-bar{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
    }
    .type-bar-item{
        padding: 0.4rem;
    }
    .type-bar img{
        max-width: 3rem;
    }
    .type-bar span{
        color: #333;
        font-size: 0.8rem;
    }

    /* ---- 广告位 ---- */
    .ad-banner{
        padding: 0.3rem 0;
        background: #f5f5f5;
    }

    /*---- 商品推荐 ----*/
    .recommend-area{
        margin-top: .3rem;
        background-color: #fff;
    }
    .recommend-title{
        padding:.2rem;
        color:#e5017d;
        font-size:14px;
        border-bottom:1px solid #eee;        
    }
    .recommend-body{
        border-bottom:1px solid #eee;
    }
    .recommend-item{
        width:99%;
        border-right:1px solid #eee;
        font-size:12px;
        text-align: center;
    }

    /* ---- 热销推荐 ---- */
    .hot-area{
       text-align: center;
       font-size:14px;
       height: 1.8rem;
       line-height:1.8rem;
    }
</style>



