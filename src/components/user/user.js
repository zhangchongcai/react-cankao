import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {tabbar} from '../../Actions';
//引入样式
import '../../css/home.scss'
import {Route,NavLink,withRouter,Redirect,Switch} from 'react-router-dom';

//引入组件
import Log from './log'
import Reg from './reg'
import Userinfo from './userInfo'

class User extends Component{
    constructor(){
        super()
        this.state={

        }

    }

    componentWillMount(){
        this.props.changeTab(false);
        var user = window.localStorage.getItem('user');
        if(user){
            this.props.history.push('/user/userinfo')            
        }else{
            this.props.history.push('/user/log')            
        }
    }
    //组件
    componentWillUnmount(){
        this.props.changeTab(true)
        
    }
    render(){
        return(
                <Switch>
                    <Route path='/user/log' component={Log}></Route>
                    <Route path='/user/reg' component={Reg}></Route>
                    <Route path='/user/userinfo' component={Userinfo}></Route>
                    {/* <Redirect from='/user' to='/user/reg' exact /> */}
                </Switch>
        )
    }

}
let mapStateToProps = state=>{
//此处必须返回一个对象
    return{}
}
let mapDispatchToProps = dispatch=>{
    return{
        //把changeTab方法映射到props
        changeTab(status){
            dispatch(tabbar(status));
        }
    }
}

User = connect(mapStateToProps,mapDispatchToProps)(User)

export default User;