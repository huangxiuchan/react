import React,{Component} from 'react';

export default class SlidersItem extends Component{
    render(){
        return (
           <ul className="sliders">
               {
                   this.props.images.map((item,index)=>(
                       <li className={`slider ${this.props.act == index ? 'active' : ''} ${this.props.prev == index ? 'prev' : ''} ${this.props.next == index ? 'next' : ''}`} key={index}>
                           <img src={item} alt=""/>
                       </li>
                   ))
               }
           </ul>
        )
    }
}