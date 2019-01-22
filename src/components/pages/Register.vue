<template>
    <div>
        <van-nav-bar
            title="用户注册"
            left-text="返回"
            left-arrow
            @click-left="goBack"/>
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"/>
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required/>
            <div class="register-button">
                <van-button type="primary" size="normal" @click="axiosRegisterUser()">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Url from '@/serviceAPI.config.js'
    export default {
        data(){
            return {
                username : "",
                password : "",
                dataUserInfoListName : []
            }
        },
        components: {},
        created: function(){
                //
                axios({
                    url: 'https://wd6518844382ndemtb.wilddogio.com/userInfo.json',
                    method: 'get',
                })
                .then(res=> {
                    // console.log( '---------发送获取用户请求-----------' );
                    var res = res.data;
                    // console.log( res );
                    for( let key in res ){
                        // 将野狗返回数据中的json的key值作为唯一的uid
                        res[key].uid = key.replace(/\-/g,"");
                        this.dataUserInfoListName.push( res[key].username );
                        
                    }
                    // console.log( '----------------------' );
                    //  console.log( this.dataUserInfoListName );

                    
                })
                .catch(err=> {

                })
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            axiosRegisterUser(){
                if( /[`~!@#$%^&*()+=|{}':;',.<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]/im.test(this.username) ){
                    // Toast( "用户名中禁止包含特殊字符" );
                    Toast({
                        message : "用户名中禁止包含特殊字符",
                        type : "fail" ,
                        mask : true,
                        position : middle,
                        forbidClick : true,
                        duration : 2000
                    });
                }else if( this.username.replace(/\s/g,"") == "" ){
                    alert("用户名不能为空");
                }else if( this.password.replace(/\s/g,"") == "" ){
                    alert("密码不能为空");
                }else{
                    if( this.dataUserInfoListName.length > 0 ){
                        let sendLock = false;
                        for( let i = 0 ; i < this.dataUserInfoListName.length ; i++ ){
                            if( this.username.replace(/\s/g,"") == this.dataUserInfoListName[i].replace(/\s/g,"") ){
                                alert( "用户名已注册" );
                                return sendLock = false;
                            }else{
                                sendLock = true;   
                            }
                        }
                        if( sendLock ){
                            // console.log("锁已开！！！");
                            axios({
                                url: 'https://wd6518844382ndemtb.wilddogio.com/userInfo.json',
                                method: 'post',
                                data:{
                                    username:this.username,
                                    password:this.password 
                                }
                            })
                            .then(res=> {
                                // console.log( '--------发送注册请求---------' );
                                // console.log(res);
                                if( res.status == 200 ){
                                    alert("注册成功");
                                    this.$router.push('/index');
                                }
                            })
                            .catch((err) => {
                                // console.log(err);
                            })                              
                        }

                    }else{
                        console.log("分支2");
                        // 发送注册请求
                        axios({
                            url: 'https://wd6518844382ndemtb.wilddogio.com/userInfo.json',
                            method: 'post',
                            data:{
                                username:this.username,
                                password:this.password 
                            }
                        })
                        .then(res=> {
                            // console.log( '--------发送注册请求---------' );
                            // console.log(res);
                            if( res.status == 200 ){
                                alert("注册成功");
                                this.$router.push('/index');
                            }
                        })
                        .catch((err) => {
                            // console.log(err);
                        })                        
                    }                    
                }
                


            }
        }
    }
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>


