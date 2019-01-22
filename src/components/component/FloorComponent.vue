<template>
    <!-- 公共组件：楼层组件
       **： index页面重复楼层复用
     -->
    <div>
        <div class="floor">
            <div class="floor-title">
                <span>{{index}}F</span><span>{{floorTitle}}</span>
            </div>

            <div class="floor-anomaly">
                <div class="floor-one"><img :src="floor_0.image" width="100%" /></div>
                <div>
                    <div class="floor-two"><img :src="floor_1.image" width="100%" /></div>
                    <div><img :src="floor_2.image" width="100%" /></div>
                </div>
            </div>

            <div class="floor-rule">
                <div v-for="(item ,index) in floor.slice(3)" :key="index">
                    <img :src="item.image" width="100%"/>
                </div>
            </div>

        </div>        
    </div>    
</template>

<script>
    export default {
        data (){
            return {
                floor : [],
                floor_0: [], 
                floor_1: [],
                floor_2: [],
            }
        },
        props: ['floorData','floorTitle','index'],
        watch: {
            floorData : function(val){
                this.floor = val;
                this.floor_0 = val[0];
                this.floor_1 = val[1];
                this.floor_2 = val[2];
                // this.floor_0 = val[0];
                // this.floor_1 = val[1];
                // this.floor_2 = val[2];

            }
        }
    }
</script>

<style scoped>
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


