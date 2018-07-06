import React,{Component} from 'react';
export default class SlidersArrows extends Component{
    constructor(props){
        super(props);
        this.state = {
            click: false
        }
    };
    turnLeft(e){
        if(!this.props.isClick){
            this.props.turn(-1,-1);
            this.props.changeClickType(true);
            let _this = this;
            setTimeout(function(){
                _this.props.changeClickType(false);
            },1000)
        }
        e.stopPropagation()
    };
    turnRight(e){
        if(!this.props.isClick){
            this.props.turn(1,1);
            this.props.changeClickType(true);
            let _this = this;
            setTimeout(function(){
                _this.props.changeClickType(false);
            },1000)
        }
        e.stopPropagation()
    };
    render(){
        return (
            <div
                className="arrows"
            >
                <span
                    className="arrow arrow-left"
                    onClick={(e)=>this.turnLeft(e)}
                >
                    &lt;
                </span>
                <span
                    className="arrow arrow-right"
                    onClick={(e)=>this.turnRight(e)}
                >
                    &gt;
                </span>
            </div>
        )
    }
}