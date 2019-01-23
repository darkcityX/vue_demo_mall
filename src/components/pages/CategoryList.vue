<template>
    <div>
        <!-- 1、顶边栏 -->
        <div class="navbar-div">
            <van-nav-bar
                title="列表页"
                left-text="返回"
                left-arrow
               
                @click-left="onClickLeft"/>
        </div>
        <!-- main -->
        <div>
            <!-- 2、左侧列表  -->
            <van-col span="6">
                <ul id="leftNav">
                    <li v-for="(item,index) in category" 
                        :key="index"
                        @click="clickCategory(index,item.ID)" 
                        :class="{categoryActive:categoryIndex==index}">
                        {{item.MALL_CATEGORY_NAME}}    
                    </li>
                </ul>
            </van-col>

            <!-- 3、右侧列表 -->
            <van-col span="18">
                <div class="tabCategorySub">
                    <van-tabs v-model="active" animated>
                        <van-tab v-for="(item, index) in categorySub" :key="index" 
                            :title="item.MALL_SUB_NAME">
                            <!-- 内容{{index}} -->

                            <div id="list-div">
                                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                                    <van-list
                                        v-model="loading"
                                        :finished="finished"
                                        @load="onLoad(item.ID)">
                                        <div class="list-item" v-for="item in list" :key="item">
                                            <!-- {{item}} -->
											<!-- <img :src="item.IMAGE1" alt="">
											<div class="list-item-info">

											</div> -->
											<dl>
												<dt>
													<img :src="item.IMAGE1" alt="">
												</dt>
												<dd>
													<p class="itemName">{{item.NAME}}</p>
													<p class="itemPrice">
														<span>现价：￥{{item.ORI_PRICE}}</span>
														<span>优惠价：￥{{item.PRESENT_PRICE}}</span>	
													</p>
												</dd>
											</dl>
                                        </div>
                                    </van-list>
                                </van-pull-refresh>
                            </div>

                        </van-tab>
                    </van-tabs>
                </div>
            </van-col>            
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import Url from '@/serviceAPI.config.js';
    export default {
        data(){
            return {
                category : [],      // 大类列表
                categoryIndex : 0,  // 一级大类选定下标

                categorySub : [],   // 二级大类列表
                active : 0,         // 默认选定的二级标题

				GoodsID: "",
                list: [],
                loading:false,   //上拉加载使用
                finished:false,  //下拉加载是否没有数据了

                isRefresh:false, //下拉加载
            }  
        },
        beforeCreate(){
            // console.log("---- 创建前状态 ----");
        },
        created(){
            // console.log("---- 创建后状态 ----");
            // 调用一级大类接口调用方法
            this.getCategory();   
            
            // 调用二级大类接口调用方法
            this.clickCategory(0,1);
        },
        mounted(){
            // console.log("---- 挂载后 ----");
            let winHeight = document.documentElement.clientHeight;
            document.getElementById("leftNav").style.height= winHeight-46 +'px';
            // console.log( document.getElementById('list-div') );
        },
        updated(){
            // console.log("---- 状态更新后----");
            // console.log( document.getElementById('list-div') );
            let winHeight = document.documentElement.clientHeight;
            document.getElementById('list-div').style.height=winHeight-130 +'px';
            
        },
        methods: {
            onClickLeft(){  // 顶部栏返回按钮
                this.$router.go(-1);
            },
            getCategory(){//一级大类接口调用方法
                axios({
                    url: Url.getCategoryList,
                    methods: 'get'
                })
                .then(res=>{
                    // console.log( res ); 
                    if( res.status == "200" ){
						this.category = res.data;
						console.log( this.category );

                        
                    }  
                })
                .catch(err=>{
                    // console.log( err );
                })
            },
            clickCategory(index,categoryId){ // 一级菜单单击事件
                // console.log( "clickCategory方法：" + categoryId );
                this.categoryIndex=index;
                // 调用二级菜单后端接口请求函数
                this.getCategorySub(categoryId);

                
            },
            getCategorySub(categoryId){ // 二级菜单后端请求方法
                this.categorySub = [];
                this.active = 0;
                console.log( "getCategorySub方法："+categoryId );
                axios({
                    url:Url.getCategorySubList,
                    method:'get',
                })
                .then(res=>{
                    if( res.status == "200" ){
						console.log( res.data );
                        for( let obj in  res.data ){
                            if( res.data[obj].MALL_CATEGORY_ID == categoryId ){
                                this.categorySub.push( res.data[obj] );
                                this.active = 0;
                            }
                        }
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }  
                })
                .catch(error=>{
                    console.log(error)
                }) 
            },
			onLoad(GoodsID){  // 上拉加载
				console.log( "二级菜单传进来的值为："+ GoodsID );
				this.GoodsID = GoodsID;
                // setTimeout(()=>{
					axios({
						url: Url.getListDetailsInfo,
						methods: 'get'
					})
					.then(
						res=>{
							console.log( res );
							if( res.status == "200" ){
								for( let obj in res.data ){
									if( GoodsID == res.data[obj].SUB_ID ){
										this.list.push( res.data[obj] );
									}
								}
								console.log( this.list );
							}
						}
					)
					.catch(
						err=>{
							console.log("服务器报错，数据未请求");
						}
					)
                    // for( let i = 0 ; i < 10 ; i++ ){
                    //     this.list.push( this.list.length+1 );
                    // }
                    // this.loading=false;
                    // if (this.list.length >= 40) {
                    //     this.finished = true;
                    // }
                    // console.log( this.list.length );
                // },500);
            },
            onRefresh(){ // 下拉更新
                setTimeout(() => {
                    this.isRefresh = false;
                    this.list=[];
                    this.onLoad(this.GoodsID);
                }, 500);
            }
        }
    }
</script>

<style scoped>
    #leftNav li{
        line-height: 2rem;
        border-bottom:1px solid #E4E7ED;
        padding:3px;
        font-size:0.8rem;
        text-align: center;       
    }
    .categoryActive{
        color: #fff;
        background-color: #FBB03B;
    }
    .list-item{
        height: 80px;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff; 
    }
	.list-item dl{
		margin: 0;
		height: 80px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	 }
	.list-item dl dt{
		display: block;
		min-width: 40%;
	}
	.list-item dl dt img{
		margin: 0 auto;
		padding: 0 0.4rem;
		display: block;
		width: 70%;
		min-width: 70%;
		line-height: 80px;
		background: #ccc;
	}
	.list-item dd{
		margin: 0;
		min-width: 60%;
	}
	.list-item dd p{
		margin: 0;
		font-size: 0.8rem;
		text-align: left;
	}
	.list-item dd .itemName{
		box-sizing: border-box;
		padding: 5px 0;
		min-height: 50px;
		max-height: 50px;
		
	}
	.list-item dd .itemPrice{
		min-height: 30px;
		line-height: 30px;
		font-size: 0.6rem;
	}
    #list-div{
        overflow-y: auto;
    } 
    #leftNav{
        border-right: 1px solid #e5e5e5;
    }
</style>
