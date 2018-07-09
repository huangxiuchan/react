import React,{Component} from 'react';
import './Sliders.css';
import SlidersItem from './SlidersItem';
import SlidersArrows from './SlidersArrows';
import SlidersDots from './SlidersDots';

export default class Sliders extends Component{
    constructor(props){
        super(props);
        this.state={
            isClick:false,
            prev: -1,
            act:0,
            next: -1,
            x:0,
            y:0,
            dx:0,
            dy:0,
        };
        this.turn = this.turn.bind(this);
        this.clickDot = this.clickDot.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.changeClickType = this.changeClickType.bind(this);
        
    };
    handleTouchStart(event){
        console.log(event.touches[0].clientX);
        this.setState({
            x:event.touches[0].clientX,
            y:event.touches[0].clientY,
        });
    };
    handleTouchMove(event){
        this.setState({
            dx:event.touches[0].clientX,
            dy:event.touches[0].clientY,
        });
    };
    handleTouchEnd(event){
        if(!this.state.isClick){  
            let m_x = this.state.x - this.state.dx;
            if(m_x>10 && m_x<this.state.x){
                this.clickDot(1,1);
            }
            if(m_x<-10){
                this.clickDot(-1,1);
            }
            this.setState({
                x:0,
                y:0,
                dx:0,
                dy:0,
            });

            this.changeClickType(true);
            let _this = this;
            setTimeout(function(){
                _this.changeClickType(false);
            },1000)

        }
    };
    changeClickType(type){
        this.setState({
            isClick:type
        })
    };
    componentDidMount(){
        if(this.props.autoPlay){
             this.go();
        }
        console.log("componentDidMount")
    };
    
    componentWillUnmount(){ 
        // 重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };
        console.log("componentWillUnmount");
        clearInterval(this.timer);

    };
    go(){
        this.timer=setInterval(()=>{
            this.clickDot(1,1)
        },this.props.delay*1000)
        
    };
    stop(){
        clearInterval(this.timer);
    };
    clickDot(type,step){
        let _this = this;
        let curentIndex = this.state.act;
        $(".sliders li").removeClass("prev").removeClass("next").removeClass("left").removeClass("right");
        
        let act= this.state.act + step;
        if(act>=this.props.images.length){
            act=0;
        }
        if(act<0){
            act=this.props.images.length-1;
        }
        if(type == 1){

            setTimeout(() => {
            $(".sliders li").eq(act).addClass("next");
                
            }, 5);
            setTimeout(() => {
                $(".sliders li").eq(curentIndex).addClass("left");
                $(".sliders li").eq(act).addClass("left");
                    
            },50);

            setTimeout(() => {
                $(".sliders li").eq(curentIndex).removeClass("active").removeClass("left");
                $(".sliders li").eq(act).removeClass("left").removeClass("next");
            },1000);
        }

        if(type == -1){
            setTimeout(() => {
                $(".sliders li").eq(act).addClass("prev");
                    
            }, 5);
            setTimeout(() => {
                $(".sliders li").eq(curentIndex).addClass("right");
                $(".sliders li").eq(act).addClass("right");
                    
            },50);
            setTimeout(() => {
                $(".sliders li").eq(curentIndex).removeClass("active").removeClass("right");
                $(".sliders li").eq(act).removeClass("right").removeClass("prev");
            },1000);
        }

        setTimeout(() => {
            _this.setState({
                act:act,
                next: -1,
                prev:-1
            }) 
        },1000);
        
    };
    turn(type,step){
        let act= this.state.act + step;
        let next = this.state.next + step;
        let prev = this.state.prev + step;
        
        if(act>=this.props.images.length){
            act=0;
        }
        if(act<0){
            act=this.props.images.length-1;
        }
        
        if(prev < 0){
            prev = this.props.images.length-1;
        }

        if(prev>=this.props.images.length){
            prev= 0 + prev - this.props.images.length;
        }

        if(next < 0){
            next = this.props.images.length-1;
        }

        if(next>=this.props.images.length){
            next=0;
        }
        
        this.setState({
            act:act,
            prev:prev,
            next:next
        })


    };

    render(){
        return (
            <div
                className="wrapper"
                onMouseOver={()=> clearInterval(this.timer)}
                onMouseLeave={()=> this.go()}
                
                onTouchStart = {this.handleTouchStart}
                onTouchMove = {this.handleTouchMove}
                onTouchEnd = {this.handleTouchEnd}
            >
                <SlidersItem
                    images={this.props.images}
                    act={this.state.act}
                    prev={this.state.prev}
                    next={this.state.next}

                    
                />
                <SlidersArrows
                    turn={this.clickDot}
                    changeClickType={this.changeClickType}
                    isClick = {this.state.isClick}
                />
                <SlidersDots
                    images={this.props.images}
                    clickDot={this.clickDot}
                    act={this.state.act}
                    changeClickType={this.changeClickType}
                    isClick = {this.state.isClick}
                />
            </div>
        )
    }
};