import React ,{Component} from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import '../../css/index.css';
import '../../css/home.scss';
class Swiper extends Component{
    constructor(){
        super()
        this.state = {
          data: [
            {title:'5G网络始待即将来临',img:"http://img.ckxx.net/a/thumb/10001/201811/7281322dcf3709f7e42065cce5a8a0dc.jpeg!w640_h294.jpeg"},
            {title:'美国直升飞机军事演练',img:"http://img.ckxx.net/a/thumb/10001/201811/fd5e37fef69a57c5f5868e5b6debf879.jpeg!w640_h294.jpeg"},
            {title:'英国首都会议开幕式',img:"http://img.ckxx.net/a/thumb/10001/201811/904978ff750a4a1c7d6fba069bbc457c.jpeg!w640_h294.jpeg"},
            {title:'波音F12军事演练',img:"http://img.ckxx.net/a/thumb/10001/201811/b8af68751b8d9558403e7daf3d14fae1.gif!w640_h294.gif"},
          ],
          imgHeight: 176,
        }
        
    }
    
    componentDidMount() {
      }
    render(){
        return(
            <WingBlank>
        <Carousel className="space-carousel"
          frameOverflow="visible"
          cellSpacing={10}
          slideWidth={0.8}
          autoplay
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => this.setState({ slideIndex: index })}
          dotStyle={{width:"10px",height:'3px',borderRadius:'5px',marginBottom:'5px'}}
          dotActiveStyle={{width:"20px",height:'3px',borderRadius:'5px',background:'red',marginBottom:'5px'}}
        >
          {this.state.data.map((val, index) => (
            <a
              key={val.title}
              href=""
              style={{
                display: 'block',
                position: 'relative',
                textAlign:"center",
                top: this.state.slideIndex === index ? -10 : -10,
                height: this.state.imgHeight,
                // boxShadow: '2px 1px 1px rgba(0, 0, 0, 0.2)',
              }}
            >
              <img
                src={val.img}
                alt="12312312"
                style={{ width: '100%',height:'164px', verticalAlign: 'top' ,marginBottom:"5px"}}
                  
              />
              <span >{val.title}</span>

            </a>
            
          ))}
        </Carousel>
      </WingBlank>
        )
    }

}
export default Swiper;