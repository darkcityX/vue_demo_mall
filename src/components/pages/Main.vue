<template>
    <div>
        <div class="main-div">
            <router-view />
        </div>


        <van-tabbar v-model="active" @change="changeTabbar(active)">
            <van-tabbar-item icon="shop">首页</van-tabbar-item>
            <van-tabbar-item icon="records">列表页</van-tabbar-item>
            <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
            <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
        </van-tabbar>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                active: 0
            }
        },
        created(){
            this.changeTabBarActive();    
        },
        updated(){
            // console.log("main更新后");
            this.changeTabBarActive();
        },
        methods: {
            changeTabbar(active) {
                // console.log(active)
                switch(active){
                    case 0:
                        this.$router.push({path:'/index'})
                        break;
                    case 1:
                        this.$router.push({path:'/list'})
                        break;
                    case 2:
                        this.$router.push({path:'/cart'})
                        break;
                    case 3:
                        break;
                }
            },
            changeTabBarActive(){
                // console.log( "-------- 调用changeTabBarActive ----------" );
                this.nowPath=this.$route.path;
                if( this.nowPath == '/index' ){
                    this.active = 0;
                }else if( this.nowPath == '/list' ){
                    this.active = 1;
                }else if( this.nowPath =='/cart'){
                    this.active = 2;
                }
                // console.log( this.active );
            },
        }      
    }
</script>

<style scoped>
    .main-div{
        margin-bottom: 60px;
    }
</style>


