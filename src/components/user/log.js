import React ,{Component} from 'react';
import '../../css/home.scss'
import logo from '../../img/logo_cankao.png';
import {connect} from 'react-redux';
//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
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
class Log extends Component{
    constructor(){
        super()
        this.state={
            iconLeft:"chevron-left",
            iconPhone:"mobile-alt",
            iconLock:"lock"
        }
    }
    handlerToHome(){
        let {history} = this.props;
        history.push('/home')
    }
    handlerToLogin(){
        var user = document.getElementById('username').value;
        var pass = document.getElementById('userpass').value
        console.log(user,pass)
        axios.post('http://localhost:8008/api/users/log',{userName:user,userPass:pass})
        .then((res)=>{
            console.log(res)
            if(res.data.status==1){
                Toast.success('登陆成功', 1.5,()=>{
                    this.props.changeUserstatus(true);
                    window.localStorage.setItem('user',user)
                    this.props.history.push('/home/main')
                });
            }else{
                Toast.fail('账号密码错误', 1.5);
            }
        })
        console.log(this.props)
    }
    handlerQuickReg(){
        this.props.history.push('/user/reg')
    }
    componentDidMount(){
        setTimeout(() => {
            Toast.hide();
          }, 3000);
    }
    componentWillUnmount(){}
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
						<input type="text" placeholder="请输入手机号" id="username"/>
					</div>
					<div className="login_form_email">
						<span><FontAwesomeIcon icon={this.state.iconLock}/></span>
						<input type="password" placeholder="请输入密码" id="userpass" />
					</div>
					<div className="login_form_login">
						<div className="quickReg" onClick={this.handlerToLogin.bind(this)}>登陆</div>
					</div>
					<div className="login_form_reg">
						<span onClick={this.handlerQuickReg.bind(this)}>注册</span>
                        <span>参考消息</span>
					</div>
				</div>
			</div>

            </div>
            
        )
    }

}
let mapStateToProps = state=>{
    //此处必须返回一个对象
        return{}
    }
let mapDispatchToProps = dispatch=>{
    return{
        //把changeUserstatus方法映射到props
        changeUserstatus(status){
            dispatch({
                type:"change_userStatus",
                payload:status
            });
        }
    }
}

Log = connect(mapStateToProps,mapDispatchToProps)(Log)

export default Log;