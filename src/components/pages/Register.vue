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
            <router-link class="goLogin" to="/login">已有账号？去登陆</router-link>
            <div class="register-button">
                <van-button type="primary" size="normal" @click="axiosRegisterUser()">马上注册</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
	import Url from '@/serviceAPI.config.js';
	import { Toast } from 'vant'
	
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
                    url: Url.getUserInfo,
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
                    Toast({
                        message : "用户名中禁止包含特殊字符",
                        type : "fail" ,
                        mask : false,
                        position : "middle",
                        forbidClick : true,
                        duration : 2000
                    });
                }else if( this.username.replace(/\s/g,"").length < 5 ){
					Toast({
                        message : "用户名不能小于5位",
                        type : "fail" ,
                        mask : false,
                        position : "middle",
                        forbidClick : true,
                        duration : 2000
                    });
				}else if( this.username.replace(/\s/g,"") == "" ){
					Toast({
                        message : "用户名不能为空",
                        type : "fail" ,
                        mask : false,
                        position : "middle",
                        forbidClick : true,
                        duration : 2000
                    });
                }else if( this.password.replace(/\s/g,"").length < 6 ){
					Toast({
                        message : "密码不能小于6位",
                        type : "fail" ,
                        mask : false,
                        position : "middle",
                        forbidClick : true,
                        duration : 2000
                    });					
				}else if( this.password.replace(/\s/g,"") == "" ){
                    Toast({
                        message : "密码不能为空",
                        type : "fail" ,
                        mask : false,
                        position : "middle",
                        forbidClick : true,
                        duration : 2000
                    });
                }else{
                    if( this.dataUserInfoListName.length > 0 ){
                        let sendLock = false;
                        for( let i = 0 ; i < this.dataUserInfoListName.length ; i++ ){
                            if( this.username.replace(/\s/g,"") == this.dataUserInfoListName[i].replace(/\s/g,"") ){
                                Toast({
									message : "用户名已经被注册了",
									type : "fail" ,
									mask : false,
									position : "middle",
									forbidClick : true,
									duration : 2000
								});
                                return sendLock = false;
                            }else{
                                sendLock = true;   
                            }
                        }
                        if( sendLock ){
                            // console.log("锁已开！！！");
                            axios({
                                url: Url.getUserInfo,
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
                                    Toast({
										message : "注册成功!3s后跳转...",
										type : "success" ,
										mask : false,
										position : "middle",
										forbidClick : true,
										duration : 3000
									});
									const timer = setInterval(() => {
										this.$router.push('/login');
										clearInterval(timer);
									}, 3000);
                                    // this.$router.push('/index');
                                }
                            })
                            .catch((err) => {
                                // console.log(err);
                            })                              
                        }

                    }else{
                        //console.log("分支2");
                        // 发送注册请求
                        axios({
                            url: Url.getUserInfo,
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
                                Toast({
								    message : "注册成功!3s后跳转...",
									type : "success" ,
									mask : false,
									position : "middle",
									forbidClick : true,
									duration : 3000
								});
								const timer = setInterval(() => {
									this.$router.push('/login');
									clearInterval(timer);
								}, 3000);
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
	.van-toast__text{
		text-align: center;
	}
    .goLogin{
        padding: 10px 0;
        display: block;
        color: #ff0000;
        font-size: 16px;
        text-align: right;
        text-decoration: underline;
    }
</style>


