import React,{Component} from 'react';
export default class SlidersDots extends Component{
    constructor(props){
        super(props);
    };
    clickDot(index,e){
        if(!this.props.isClick){
            let step = index - this.props.act;
            let type = 0;
            if(step >0){
                type = 1;
            }
            if(step<0){
                type = -1;
            }
            this.props.clickDot(type,step);
            this.props.changeClickType(true);
            let _this = this;
            setTimeout(function(){
                _this.props.changeClickType(false);
            },1000)
        };
        e.stopPropagation()
    };
    render(){
        return (
            <div
                className="dots"
            >
                {
                    this.props.images.map((item,index)=>(
                        <span
                            key={index}
                            className={"dot "+(index==this.props.act ?'active':'')}
                            onClick={(e)=>this.clickDot(index,e)}
                        >
                        </span>
                    ))
                }
            </div>
        )
    }
}