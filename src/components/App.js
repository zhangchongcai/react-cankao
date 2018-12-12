import React ,{Component} from 'react';
import {Route,NavLink,withRouter,Redirect,Switch} from 'react-router-dom';
import {TabBar} from 'antd-mobile';
import {connect} from 'react-redux';
//引入样式
import 'antd-mobile/dist/antd-mobile.css';
import '../css/index.css';

//引入组件
import Home from './home/Home';
import Sort from './sort/Sort';
import Video from './video/Video';
import User from './user/user';
import Newdetil from './home/Newdetil';

import '../css/index.css';
//引入字体
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome,
    faListUl,
    faVideo,
    faUser,
    faIndustry,
    } from '@fortawesome/free-solid-svg-icons';
library.add(
    faHome,
    faListUl,
    faVideo,
    faUser,
    faIndustry, 
)


class App extends Component{
    constructor(){
        super();
        this.state= {
            tabs:[
                {
                    title:'首页',
                    path:'/home',
                    icon:'home',
                },
                {
                    title:'分类',
                    path:'/sort',
                    icon:'industry',

                },
               
                {
                    title:'视频',
                    path:'/video',
                    icon:'video',
                },
                {
                    title:'我的',
                    path:'/user',
                    icon:'user',

                }
            ],
            currentTab:0,
        }
        this.HeadlderClick = this.HeadlderClick.bind(this);
    }
    componentWillMount(){
        let hash = window.location.hash.slice(1);
        var arr = hash.split('/')
        let currentTab = 0 ;
        this.state.tabs.some((item,index)=>{
            currentTab = index;
            return item.path.slice(1)===arr[1];
        })
        this.setState({
            currentTab
        })
    }
    HeadlderClick(index,path){
        let hash = window.location.hash.slice(1);
        if(hash===path){return}
        this.setState({
        currentTab:index,
        });
        this.props.history.push(path)
        // console.log(this.props)

    }
    render(){
        return(<div className="swap">
                    <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/sort' component={Sort}></Route>
                        <Route path='/video' component={Video}></Route>
                        <Route path='/user' component={User}></Route>
                        <Redirect from='/home' to='/home/main'  />
                    </Switch>
                    <TabBar
                    tintColor='red'
                    hidden={!this.props.tabStatus}
                    >
                    {
                        this.state.tabs.map((tab,index)=>{
                            return <TabBar.Item
                            title={tab.title}
                            key={index}
                            icon={<FontAwesomeIcon icon={tab.icon} />}
                            selectedIcon={<FontAwesomeIcon icon={tab.icon} /> }
                            dot={false}
                            tabBarPosition='bottom'
                            selected={this.state.currentTab === index}
                            onPress={this.HeadlderClick.bind(this,index,tab.path)}
                            >
                            </TabBar.Item>
                        })
                    } 
                    </TabBar>
                </div>   
            )
    }
}

let mapStateToProps = state=>{
    //此处必须返回一个对象  
    // console.log(state);
    return{
        //
        tabStatus : state.tabReducer.tabStatus
    }
}

App = connect(mapStateToProps)(App)


App = withRouter(App);
export default App;