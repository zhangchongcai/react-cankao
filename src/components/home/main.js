import React ,{Component} from 'react';
import Swiper from '../common/swiper';
import axios from 'axios';
import '../../css/home.scss';
import {connect} from 'react-redux'
import DefaultImg from "../common/DefaulImg"
class Main extends Component{
    constructor(){
        super()
        this.onEndReached = this.onEndReached.bind(this);
        this.state={
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            dataSource:[],
            page:1, //请求的页数
            fun:null,
            shouldRend:false
        }
        this.goToDetl = this.goToDetl.bind(this);
        this.scrollCallback = this.scrollCallback.bind(this);
    }
    goToDetl(item) {
        var item = JSON.stringify(item)
        window.localStorage.setItem('news',item)
        let {history} = this.props
        history.push('/home/detail')
    }
    componentWillMount(){
        this.props.scrollCallback(this.scrollCallback)
        
        axios.get(`/ckapi/index/ajax/content?page=${this.state.page}&pagesize=8`,)
        .then((res)=>{
            var dataSource = res.data.data;
            this.setState({
                dataSource,
                shouldRend:true,
            })
        })
        .catch((err)=>{
            
        })
    }
    componentDidMount(){}
    //滚动条事件

    scrollCallback(){
            var page = ++this.state.page;
            this.setState({page})
            axios.get(`/ckapi/index/ajax/content?page=${this.state.page}&pagesize=8`,)
            .then((res)=>{  
                console.log("==========该请求数据了===============")
                var dataCurrent = res.data.data;
                var dataSource = this.state.dataSource;
                Array.prototype.push.apply(dataSource,dataCurrent)
                this.setState({
                    dataSource
                },()=>{

                })
            })
            .catch((err)=>{
            })
    }
    componentWillUnmount(){
        var el = document.getElementsByClassName('am-pull-to-refresh')[0];
        el.scrollTop=0;
    }
    //下拉
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
          return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
          this.setState({
            isLoading: false,
          });
        }, 1000);
      }
      //图片失败处理
      imgError(img){
      }
    render(){
        console.log('这里是main');
        return(
            <div>
                <Swiper></Swiper>
                {
                    this.state.dataSource.map((item,index)=>{
                        return <div className="home_new_box" key={item['id']+1} onClick={()=>this.goToDetl(item)}>
                            <DefaultImg src={'http://m.ckxx.net/'+ item.thumb['url']}></DefaultImg>
                            <div className="conten" >
                                <div className="titl">{item.title}</div>
                                <div className="bot"><span>{item.tran_published}</span><span>{item.source}</span></div>
                            </div>
                        </div>
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

Main = connect(mapStateToProps,mapDispatchToProps)(Main)
export default Main;