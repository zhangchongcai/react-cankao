import React ,{Component} from 'react';
import '../../css/other.scss'
import axios from 'axios'
import { Icon } from 'antd-mobile';
import {connect} from 'react-redux';
class VideoDetil extends Component{
    constructor(){
        super()
        this.state={
            data:{},
            booleam:false,
        }
    }
    componentWillMount(){
        console.log(this.props)
        var id = this.props.match.params.id;
        var url = `/nfapi/mobile/contents/${id}?version=1.1.1&
        platform=wap&machine_id=0b31ad7615704f73e567e3031a386707&user_id=&token=`
        axios.get(url)
        .then((res)=>{
            var data = res.data.data.content;
            console.log(data)
            this.setState({
                data,booleam:true
            })
        })
        .catch((err)=>{
            
        })
    }
    goback(){
        this.props.history.go(-1);
    }
    gotoLogin(){
        this.props.history.push('/user/log')
    }
    render(){
        let {data} = this.state
        var oldTime = (new Date(data.publish_time)).getTime();
        var time = new Date(oldTime)
        var y = time.getMonth()+'月';
        var r = time.getDate()+'日' ;
        return(
                <div className="videoBody">
                <Icon type={"left"}  color="white" size="lg" onClick={this.goback.bind(this)}/>
                    <div className="detil">
                        <div className="title">
                            <h1>{data.subject}</h1>
                            <div className="meta">
                                <p>{data.author}</p>
                                <p>网络编辑:{data.content_network_editor}  责任编辑:{data.content_charge_editor}</p>
                                <p><span>{this.state.booleam?data.column.title:''}</span>  {y}{r}</p>
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{__html:this.props.userStatus?data.fulltext :data.introtext}} className="conten">
                        </div>
                        <div className="prp" style={{display:this.props.userStatus?"none":"block" } }>
                            <p>等会后获得更多阅读权限</p>
                            <div className="btn" onClick={this.gotoLogin.bind(this)}>立即登陆</div>
                        </div>
                    </div>
                </div>
        )
    }

}
let mapStateToProps = state=>{
    //此处必须返回一个对象
        return{
            userStatus:state.userStatus.userStatus
        }
    }

VideoDetil = connect(mapStateToProps)(VideoDetil)
export default VideoDetil;