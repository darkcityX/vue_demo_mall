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
                    <van-tabs v-model="active" animated @click="loadData">
                        <van-tab v-for="(item, index) in categorySub" :key="index" 
                            :title="item.MALL_SUB_NAME">
                            <!-- 内容{{index}} -->
                            <div id="listDiv">
                                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                                    <van-list>
                                        <div class="list-item" v-for="(item,index) in list" :key="index">
											<dl @click="goDetails(item.ID)">
												<dt>
													<img :src="item.IMAGE1" alt="" :onerror="errorImage">
												</dt>
												<dd>
													<p class="itemName">{{item.NAME}}</p>
													<p class="itemPrice">
														<span>现价:￥{{item.ORI_PRICE | monenyFilter}}</span>
														<span>优惠价:￥{{item.PRESENT_PRICE | monenyFilter}}</span>	
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
    import {toMoney} from '@/filter/moneyFilter.js';
    export default {
        data(){
            return {
                category : [],      // 大类列表
                categoryIndex : 0,  // 一级大类选定下标

                categorySub : [],   // 二级大类列表
                active : 0,         // 默认选定的二级标题
                nowActive: 0,

				GoodsID: "",
				dataList: [],
                list: [],
                loading:false,   //上拉加载使用
                finished:false,  //下拉加载是否没有数据了

                isRefresh:false, //下拉加载

                errorImage: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
            }  
        },
        watch:{
            active: function(evl){
                this.nowActive = evl;
            }
        },
        filters: {
            monenyFilter(money){
                return toMoney(money);
            }    
        },
        created(){
            // console.log("---- 创建后状态 ----");
            // 调用一级大类接口调用方法
            this.getCategory();   
            
            // 调用二级大类接口调用方法
            this.clickCategory(0,1);

            // 调用商品详情接口
            this.getGoodsDetails(); // 这块方法改变的是dataList里面的值

            // console.log( this.dataList );

           

            
        },
        mounted(){
            // console.log("---- 挂载后 ----");
            let winHeight = document.documentElement.clientHeight;
            document.getElementById("leftNav").style.height= winHeight-46 +'px';
            // console.log( document.getElementById('list-div') );
            let listView = document.getElementsByClassName("van-tabs__content")[0];
            listView.style.height=winHeight-140 +'px';
            listView.style.overflowY = "auto";
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
                axios({
                    url:Url.getCategorySubList,
                    method:'get',
                })
                .then(res=>{
                    if( res.status == "200" ){
                        for( let obj in res.data ){
                            if( res.data[obj].MALL_CATEGORY_ID == categoryId ){
                                this.categorySub.push( res.data[obj] );
                                this.active = 0;
                            }
                        }
                        // console.log( this.categorySub );
                        // 默认初始加载商品列表页
                        this.loadData(0,this.categorySub[this.nowActive].MALL_SUB_NAME);
                    }else{
                        Toast('服务器错误，数据取得失败')
                    }  
                })
                .catch(error=>{
                    console.error("服务器错误，请稍后再试")
                }) 
            },
            getGoodsDetails(){ // 调用商品详情接口
                // console.log( "调用商品详情接口" );
                this.dataList = [];
               	axios({
					url: Url.getListDetailsInfo,
					methods: 'get'
                })
			    .then(
					res=>{
						if( res.status == "200" ){
							for( let obj in res.data ){
								this.dataList.push( res.data[obj] );
							}							
                        }
                        // console.log( "下拉更新：" + this.nowActive );
                        // console.log( this.dataList );
                        this.loadData(0,this.categorySub[this.nowActive ].MALL_SUB_NAME);
					}
				)
				.catch(
					err=>{
						console.error("服务器报错，数据未请求");
					}
				)                
            },
            loadData(index,title){
                // console.log( "----进入loadData函数----接收到的title值为："+title );
                // 数据初始化
                this.list = [];
                for( let obj in this.categorySub ){
                    if( this.categorySub[obj].MALL_SUB_NAME == title ){
                        this.GoodsID =  this.categorySub[obj].ID;
                    }
                }
                // console.log( this.GoodsID );
                // console.log(  this.dataList.length );
                // console.log( "---------------------------------" );
                // console.log("------- 对比开始 ------");
				for( let obj in this.dataList ){
                    // console.log( "进入循环" );
                    // console.log("分类的ID----："+ this.GoodsID);
                    // console.log("目前的ID----："+ this.dataList[obj].SUB_ID );
					if( this.GoodsID == this.dataList[obj].SUB_ID ){
						this.list.push( this.dataList[obj] );
					}
                }
                // console.log( this.list );							
              
            },
            goDetails(id){
                this.$router.push({
                    name: 'detail',
                    params: {
                        goodsId: id
                    }
                })
            },
            // onLoad(){  // 上拉加载
            //     this.loading = true;
            //     this.finished = false; 
            //     if( this.dataList.length > 0 ){
            //         setTimeout(()=>{
            //             for( let i = 0 ; i < 5 ; i++ ){
            //                 this.list.push( this.dataList[this.list.length+1] );
            //             }
            //             console.log( "循环加载完成dataList的长度："+this.dataList.length );
            //             this.loading = false;
            //             console.log( "321321321313" );
            //             console.log( "此时dataList的长度为："+this.dataList.length );
            //             console.log( "此时list的长度为："+this.list.length );
            //             console.log( this.list.length >= this.dataList.length  );
            //             if (this.list.length >= this.dataList.length ) {
            //                 this.loading = false;
            //                 this.finished = false;
            //             }
            //             console.log( this.list.length );
            //         },500);		
            //     }else{
            //         this.loading = false;
            //         this.finished = false;    
            //     }
	
            // },
            onRefresh(){ // 下拉更新
                setTimeout(() => {
                    this.isRefresh = false;
                    this.list=[];
                    
                    // this.onLoad();
                    this.getGoodsDetails();
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
    .list-item dd .itemPrice span:nth-child(1){
        text-decoration: line-through;
        color: #ff0000;
    }
    /* .van-tabs__content--animated{
        overflow-y: auto !important;
    }  */
    #leftNav{
        border-right: 1px solid #e5e5e5;
    }
</style>
