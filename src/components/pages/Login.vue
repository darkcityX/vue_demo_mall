<template>
	<div>
		<van-nav-bar 
			title="用户登录"
			left-text="返回"
			left-arrow
			@click-left="goBack"/>
		
		<div class="login-panel">
			<van-field 
				v-model="username"
				label="用户名"
				icon="clear"
				placeholder="请输入用户名"
				required
				@click-icon="username = ''"
				:error-message="usernameErrorMsg"/>
			
			<van-field 
				v-model="password"
				type="password"
				label="密码"
				placeholder="请输入密码"
				icon="clear"
				@click-icon="password = ''"
				required
				:error-message="passwordErrorMsg"/>

			<div class="login-button">
				<van-button type="primary" @click="LoginAction" :loading="openLoading" size="normal">登陆</van-button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Url from '@/serviceAPI.config.js';
	import { Toast } from 'vant'
	export default {
		data () {
			return {
				username: "",
				password: "",
				openLoading: false,	
				usernameErrorMsg: '', //当用户名出现错误的时候
				passwordErrorMsg: '', //当密码出现错误的时候

				// mok数据
				dataUserInfoListName : [],
			}
		},
        created: function(){
                // console.log(localStorage.userInfo.length);
                if( localStorage.userInfo != undefined ){
                    Toast({
						message : "你已登陆啦！",
						type : "success" ,
						mask : false,
						position : "middle",
						forbidClick : true,
						duration : 3000
                    });
					const timer = setInterval(() => {
                        this.$router.push('/index');
						clearInterval(timer);
					}, 3000);                    
                }

                // mok模拟数据：将数据库中的数据取出来放在dataUserInfoListName中【！十分危险】
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
                        // res[key].uid = key.replace(/\-/g,"");
                        this.dataUserInfoListName.push({
							uid: key.replace(/\-/g,""),
							username: res[key].username,
							password: res[key].password
						});
                        
                    }
                    // console.log( '----------------------' );
                    // console.log( this.dataUserInfoListName );

                    
                })
                .catch(err=> {

                })
        },
		methods: {
			goBack(){
				this.$router.go(-1);
			},
			LoginAction(){
				this.checkForm() && this.axioLoginUser();
			},
			axioLoginUser(){
					//先把按钮进行loading状态，防止重复提交
					this.openLoading = true
					// console.log( "1111" );
					// console.log( "当前输入的用户名："+ this.username );
					// console.log( "当前输入的密  码："+ this.password );
					axios({
						url: Url.getUserInfo,
                        method: 'get',
					})
					.then(res=>{
						// console.log( res );
						let loginLock = false,loginUsernameErrorMsg = false,loginPasswordErrorMsg=false;
						for(let i =  0 ; i< this.dataUserInfoListName.length ; i++){
							// console.log( this.dataUserInfoListName[i] );
							if( this.username.replace(/\s/g,"") == this.dataUserInfoListName[i].username && this.password.replace(/\s/g,"") == this.dataUserInfoListName[i].password ){
								loginLock = true;								
							}else if( this.username.replace(/\s/g,"") == this.dataUserInfoListName[i].username && this.password.replace(/\s/g,"") != this.dataUserInfoListName[i].password ){
								// alert("用户名正确，密码错误");
								loginUsernameErrorMsg = true;
							}else if( this.username.replace(/\s/g,"") != this.dataUserInfoListName[i].username && this.password.replace(/\s/g,"") != this.dataUserInfoListName[i].password){
								// alert("用户名错误");
								loginPasswordErrorMsg = true;
							}
						}
						if( loginLock ){
							// alert( "1111111111111111111111" );
							Toast({
								message : "登陆成功!3s后跳转...",
								type : "success" ,
								mask : false,
								position : "middle",
								forbidClick : true,
								duration : 3000
							});
							const timer = setInterval(() => {
                                // 关锁
                                loginLock = false;
                                // 保存本地登陆状态
                                localStorage.userInfo={userName:this.username};
                                // 成功后跳转首页
								this.$router.push('/index');
								clearInterval(timer);
							}, 3000);	
						}else if( loginUsernameErrorMsg ){
							// alert( "22222222222222222222" );
							Toast({
								message : "密码错误，请重新输入",
								type : "fail" ,
								mask : false,
								position : "middle",
								forbidClick : true,
								duration : 3000
							});
							const timer = setInterval(() => {
                                loginUsernameErrorMsg = false;
								this.openLoading = false;
								clearInterval(timer);
							}, 3000);
						}else if( loginPasswordErrorMsg ){
							// alert( "333333333333333333" );
							Toast({
								message : "该用户名不存在，请注册",
								type : "fail" ,
								mask : false,
								position : "middle",
								forbidClick : true,
								duration : 3000
							});
							const timer = setInterval(() => {
                                loginPasswordErrorMsg = false;
								this.openLoading = false;
								clearInterval(timer);
							}, 3000);								
						}
					})
					.catch(err=>{

					})
			},
			checkForm(){
				let isOk = true;
				if( this.username.length < 5 ){
					this.usernameErrorMsg="用户名不能小于5位";
                    isOk= false;
				}else{
					this.usernameErrorMsg='';
				}
				if( this.password.length < 6 ){
					this.passwordErrorMsg="密码不能少于6位";
                    isOk= false;
				}else{
					this.passwordErrorMsg = '';
				}
				return isOk;
			}
		}

	}
</script>

<style scoped>
	.login-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .login-button{
        padding-top:10px;
    }
	.van-toast__text{
		text-align: center;
	}
</style>