import React ,{Component} from 'react';
import '../../css/home.scss'
import logo from '../../img/logo_cankao.png';
import { Toast,Icon,Button, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';

class Userinfo extends Component{
    constructor(){
        super()
        this.state={
        }
        this.handlerToHome = this.handlerToHome.bind(this);
    }
    handlerToHome(){
        let {history} = this.props;
        history.push('/home')
    }
    
    componentDidMount(){
          setTimeout(() => {
            Toast.hide();
          }, 1000);
    }
    componentWillUnmount(){
    }
    out(){
        this.props.changeUserstatus(false);
        window.localStorage.removeItem('user');
        Toast.info("退出成功！", 1,()=>{
            this.props.history.push('/user/log')
        })
    }
    render(){
        return(
            <div className="user">
                <div className="login">
                    <div className="login_top">
                        <p>
                            <Icon type={"left"}  color="white" size="lg" onClick={this.handlerToHome.bind(this)}/>
                        </p>
                        <div className="logo">
                            <img src={logo}></img>
                        </div>
                    </div>
                    <WingBlank
                    size="lg">
                   
                    <WhiteSpace size="xl"/>
                    <Button type="primary" disabled>{window.localStorage.getItem('user')}</Button><WhiteSpace />
                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                        <Button size="small" type="warning" onClick={this.out.bind(this)}>退出</Button>
                    </WingBlank>
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

Userinfo = connect(mapStateToProps,mapDispatchToProps)(Userinfo)
export default Userinfo;