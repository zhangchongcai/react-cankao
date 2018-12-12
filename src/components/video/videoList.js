import React ,{Component} from 'react';
import '../../css/other.scss'
import axios from 'axios'
import Img from '../../img/logo_cankao.png'
class VideoList extends Component{
    constructor(){
        super()
        this.state={
            data:[],
        }
    }
    componentWillMount(){
        var url = `/nfapi/mobile/contents?version=1.1.1&
        platform=wap&machine_id=0b31ad7615704f73e567e3031a386707&
        user_id=&token=&limit=20&page=1&term_id=131`
        axios.get(url)
        .then((res)=>{
            var data = res.data.data.list;
            console.log(data)
            this.setState({
                data
            })
        })
        .catch((err)=>{
            
        })
    }
    hanlderClick(id){
        this.props.history.push('/video/videodetil/'+id)
    }
    render(){
        return(
                <div className="videoBody">
                    {
                        this.state.data.map((item,index)=>{
                            let img = item.covers[0].file_path;
                            var oldTime = (new Date(item.publish_time)).getTime();
                            var time = new Date(oldTime)
                            var y = time.getMonth()+'月';
                            var r = time.getDate()+'日' 
                            return <div className="box" key={index}>
                                    <div className="title">{item.short_subject}</div>
                                    <div className="Img" onClick={this.hanlderClick.bind(this,item.id)}><img src={"http://images.infzm.com/medias/"+img}/></div>
                                    <div className="bot">
                                        <span>{item.column.title}</span>
                                        <span>{y}{r}</span>
                                    </div>
                                    <div className="sanJiaheZi"><span className="sanJia"></span> </div>
                                </div>
                        })
                    }
                </div>
        )
    }

}
export default VideoList;