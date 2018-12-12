import React ,{Component} from 'react';
import '../../css/other.scss'
import axios from 'axios'
import Img from '../../img/logo_cankao.png'
import {Route,Switch,Redirect} from 'react-router-dom';
import VideoList from './videoList';
import VideoDetil from './videodetil';
class Video extends Component{
    constructor(){
        super()
        this.state={
            data:[],
        }
    }
    componentWillMount(){}
    render(){
        return(
            <div className="videoPage">
                <div className="header">
                    <img src={Img}></img>
                </div>
                <Switch>
                    <Route path={this.props.match.url + "/videolist"} component={VideoList} data={this.pg}/>
                    <Route path={this.props.match.url + "/videodetil/:id"}  component={VideoDetil} />
                    <Redirect from='/video' to='/video/videolist' exact />
                    </Switch>
            </div>
        )
    }

}
export default Video;