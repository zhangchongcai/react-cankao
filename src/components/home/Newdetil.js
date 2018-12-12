import React ,{Component} from 'react';
import '../../css/home.scss';
import axios from 'axios';
import { left } from 'antd-mobile';
class Newdetil extends Component{
    constructor(){
        super()
        this.state={
            data:{},
        }
    }
    componentWillMount(){
        let {match} = this.props;
        var id = match.params.id;
        console.log(id)
        var url = `/nfapi/mobile/contents/`+id;
        axios.get(url)
        .then((res)=>{
            var data = res.data.data.content;
            console.log(data)
            this.setState({
                data
            })
        })
        .catch((err)=>{
            console.log("detil错误："+err)
        })
    }
    componentDidMount(){
        var header = document.getElementsByClassName('header')[0];
        header.style.display='none';    
    }
    componentWillUnmount(){
        var header = document.getElementsByClassName('header')[0];
        header.style.display='block';
    }
    render(){
        let text = this.state.data.fulltext;
        let title = this.state.data.subject
        return(
            
            <div className="detil">
               <div>
                   <h1>{title}</h1>
               </div>
               <div dangerouslySetInnerHTML = {{__html:text}}  className="text"></div>
            
            </div>
            )
    }
}
export default Newdetil;