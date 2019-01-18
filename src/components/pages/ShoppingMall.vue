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
                                <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div> 

        <!--floor one area-->
        <div class="floor">
            
            <div class="floor-title">
                <span>1F</span><span>休闲食品</span>
            </div>

            <div class="floor-anomaly">
                <div class="floor-one"><img :src="floor1_0.image" width="100%" /></div>
                <div>
                    <div class="floor-two"><img :src="floor1_1.image" width="100%" /></div>
                    <div><img :src="floor1_2.image" width="100%" /></div>
                </div>
            </div>

            <div class="floor-rule">
                <div v-for="(item ,index) in floor1.slice(3)" :key="index">
                    <img :src="item.image" width="100%"/>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import axios from 'axios';

    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

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
                floor1: [],
                floor1_0: [], 
                floor1_1: [],
                floor1_2: [],

                floor2: [],
                floor3: [],

            }   
        },
        components: {
            swiper,
            swiperSlide,
        },
        created(){
            axios.get('https://www.easy-mock.com/mock/5c417ba78ff5e33c8a227708/mall/index')
                .then(
                    res=>{
                        if( res.status == "200"){
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
                            this.floor1 = res.data.data.floor1;
                            this.floor1_0 =this.floor1[0];
                            this.floor1_1 =this.floor1[1];
                            this.floor1_2 =this.floor1[2];

                            this.floor2 = res.data.data.floor2;
                            this.floor3 = res.data.data.floor3;

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

    /* ---- 楼层1 ----- */
    .floor-title{
            margin-top: 0.5rem;
            height: 2.2rem;
            line-height: 2.2rem;
            background: #e5e5e5;
    }
    .floor-title span:first-child{
        margin-right: 0.2rem;
        color: #fff;
        border-radius: 50%;
        background-color:#CB4C2C;
    }
    .floor-anomaly{
        display: flex;
        flex-direction:row;
        background-color: #fff;
        border-bottom:1px solid #ddd;
    }
    .floor-anomaly div{
        width:10rem;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .floor-one{
        border-right:1px solid #ddd;
    }
    .floor-two{
        border-bottom:1px solid #ddd;
    }
    .floor-rule{
        display: flex;
        flex-direction: row;
        flex-wrap:wrap;
        background-color: #fff;
    }
    .floor-rule div{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width:10rem;
        border-bottom:1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
        border-right: 1px solid #ddd;
    }

</style>



