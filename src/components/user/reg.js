import React ,{Component} from 'react';
import '../../css/home.scss'
import logo from '../../img/logo_cankao.png';
//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios  from 'axios';
import { Toast,Icon} from 'antd-mobile';

import {
	faChevronLeft,
	faMobileAlt,
	faLock
    } from '@fortawesome/free-solid-svg-icons';

library.add(
	faChevronLeft,
	faMobileAlt,
	faLock
);
class Reg extends Component{
    constructor(){
        super()
        this.state={
            iconLeft:"chevron-left",
            iconPhone:"mobile-alt",
            iconLock:"lock"
        }
        this.handlerToHome = this.handlerToHome.bind(this);
        this.handlerQuickReg = this.handlerQuickReg.bind(this);
        this.handlerToLogin = this.handlerToLogin.bind(this);
    }
    handlerToHome(){
        let {history} = this.props;
        history.push('/home')
    }
    handlerQuickReg(){
        var arr = [false,false,false];
        var user = document.getElementById("username").value;
        var pass1 = document.getElementById("userpass1").value;
        var pass2 = document.getElementById("userpass2").value;
        var code = document.getElementsByClassName('code')[0].innerHTML;
        var codes = document.getElementsByClassName('codeInput')[0].value
        if(!(/^1[34578]\d{9}$/.test(user))){ 
            Toast.fail('输入正确手机号', 1);
            arr[0]=false 
        }else{arr[0]=true}
        if(!(/^\d{6}$/.test(pass1))){ 
            Toast.fail('密码要6位数',1);                          
            arr[1]=false;
        }else{
            if(!(pass1==pass2)){
                Toast.fail('密码不一致',1);   
            }else{
                arr[1]=true
            }
        }
        if(!(code==codes)){ 
            Toast.fail('验证码不正确',1);   
            arr[2]=false;
        }else{arr[2]=true}
         var bool = arr.every((itme)=>{
            return itme;
         })
         if(bool){
                axios.post('http://localhost:8008/api/users/testUser',{userName:user})
                .then((res)=>{
                    console.log(res)
                    if(res.data.status==0){
                        axios.post('http://localhost:8008/api/users/reg',{userName:user,userPass:pass1})
                        .then((res)=>{
                            console.log(res)
                            Toast.success('注册成功',1,()=>{
                                this.props.history.push('/user/log');
                            }); 
                        })  
                    }else{
                        Toast.fail('用户已存在',1); 
                    }
                })
                .catch(()=>{

                })
                
            }
            console.log(arr)

    }
    handlerToLogin(){
        this.props.history.push("/user/log")
    }
    componentDidMount(){
        //验证码
        this.createCode();    
          setTimeout(() => {
            Toast.hide();
          }, 1000);
    }
    createCode() {
        var code = "";
        var codeLength = 4; //验证码的长度
        var checkCode = document.getElementById("checkCode");
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
        for(var i = 0; i < codeLength; i++) 
        {
        var charNum = Math.floor(Math.random() * 52);
        code += codeChars[charNum];
        }
        if(checkCode) 
        {
        checkCode.className = "code";
        checkCode.innerHTML = code;
        }
    }
    componentWillUnmount(){
    }
    render(){
        return(
            <div className="user">
                <div className="login">
				<div className="login_top">
					<p>
                        <Icon type={"left"}  color="white" size="lg" onClick={this.handlerToHome.bind(this)}/>
					</p>
                    <img src={logo} />

					<div className="logo">
                    
					</div>
				</div>
				<div className="login_form">
					<div className="login_form_email">
						<span><FontAwesomeIcon icon={this.state.iconPhone}/></span>
						<input type="text" placeholder="请输入手机号码" id="username"/>
					</div>
					<div className="login_form_email">
						<span><FontAwesomeIcon icon={this.state.iconLock}/></span>
						<input type="password" placeholder="请输入密码" id="userpass1" />
					</div>
                    <div className="login_form_email">
						<span><FontAwesomeIcon icon={this.state.iconLock}/></span>
						<input type="password" placeholder="请再输入密码" id="userpass2" />
					</div>
                    <div className="codeBox">
						<input type="text" placeholder="请输入验证码" className="codeInput"/>
                        <div className='yanzhengma'><i id="checkCode" onClick={()=>this.createCode()}></i></div>
					</div>
					<div className="login_form_login">
						<div className="quickReg" onClick={this.handlerQuickReg}>注册</div>
					</div>
					<div className="login_form_reg">
						<span>已注册</span>
						<span onClick={this.handlerToLogin.bind(this)}>直接登录</span>
					</div>
				</div>
			</div>
            
            </div>
            
        )
    }

}

export default Reg;