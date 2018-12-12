import React ,{Component,ReactDOM} from 'react';
import Swiper from '../common/swiper';
import axios from 'axios';
import '../../css/home.scss';
import {connect} from 'react-redux'

class Zhongguo extends Component{
    constructor(){
        super()
        this.state={
            data:[],
            page:1,
        }
        this.goTodetail = this.goTodetail.bind(this);
        this.scrollCallback = this.scrollCallback.bind(this);
    }
    goTodetail(id){
        let {match,history} = this.props;
        history.push('/home/detil/'+id);
    }
    componentWillMount(){
        var url = `/nfapi/mobile/contents?
        version=1.1.1&platform=wap&
        machine_id=0b31ad7615704f73e567e3031a386707&
        user_id=&token=&limit=20&page=${this.state.page}&term_id=1`
        axios.get(url)
        .then((res)=>{
            var data = res.data.data.list;
            this.setState({
                data
            })
        })
        .catch((err)=>{
            
        })
    }
      componentDidMount() {
        this.props.scrollCallback(this.scrollCallback)
      }
      scrollCallback(){
        var page = ++this.state.page;
        this.setState({page})
        var url = `/nfapi/mobile/contents?
        version=1.1.1&platform=wap&
        machine_id=0b31ad7615704f73e567e3031a386707&
        user_id=&token=&limit=20&page=${page}&term_id=1`
        console.log('callback---zhongguo')
        axios.get(url)
        .then((res)=>{
            var dataCurrent = res.data.data.list;
            var data = this.state.data;
            Array.prototype.push.apply(data,dataCurrent)
            console.log(dataCurrent)
            this.setState({
                data
            })
        })
        .catch((err)=>{
            
        })
          console.log(this.state.data)
      }
      

    render(){
        return(
            <div className="zhongguo"> 
            {
                this.state.data.map((item,index)=>{
                    console.log("拉动的变化")
                    var video = JSON.stringify(item.video) 
                    if(video!="{}"){
                        var img = item.covers[0].file_path;
                        return <div className="video" key={index} onClick={()=>this.goTodetail(item.id)}>
                                    <div className="content">
                                        {item.short_subject}
                                    </div>
                                    <div className="vid">
                                        <div className="sanJiaheZi"><span className="sanJia"></span> </div>
                                        <img src={"http://images.infzm.com/medias/"+img} />
                                    </div>
                                </div>
                    }else if(!item.covers[0]){
                        return <div className="unImg" key={index} onClick={()=>this.goTodetail(item.id)}>
                                <div className="content">
                                    {item.short_subject}
                                </div>
                                <div className="lab">刚刚</div>
                           </div>
                    }else if(item.covers[0]){
                        var img = item.covers[0].file_path;
                        if(item.comment_count){var comment= item.comment_count+'评论'}
                        if(index==0){var lab="刚刚"}
                        return <div className="havaImg" key={index} onClick={()=>this.goTodetail(item.id)} >
                                <div className="content">
                                    <div>{item.short_subject}</div>
                                    <div>
                                        <span>{item.column.title}</span>
                                        <span>{comment}</span>
                                        <span>{lab}</span>
                                    </div>
                                </div>
                                <div className="smallimg"><img src={"http://images.infzm.com/medias/"+img} /></div>
                           </div>
                    }
                    
                })
            }
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
            //把changeTab方法映射到props
            scrollCallback(status){
                dispatch({
                        type:'change_Scroll',
                        payload:status
                    });
            }
        }
    }

    Zhongguo = connect(mapStateToProps,mapDispatchToProps)(Zhongguo)
export default Zhongguo;