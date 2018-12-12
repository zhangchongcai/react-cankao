import React ,{Component} from 'react';
import Img from '../../img/defaulimg.png'

class DefaulImg extends Component{
    constructor(){
        super()
        this.state={
            boolean:false,
        }
        this.ImgError = this.ImgError.bind(this)
    }
    ImgError(){
        this.setState({
            boolean:true
        })
    }
    render(){
        if(!this.props.src || this.state.boolean){
            return <img src={Img}></img>
        }
        return(
                <img src={this.props.src} onError={this.ImgError}></img>
        )
    }

}

export default DefaulImg    ;