import React from 'react'
import PubSub from 'pubsub-js'

let ListItem = React.createClass({
  chooseItem(){
    PubSub.publish('chooseItem',this.props.item);
  },
  render() {
      return (
        <li onClick={this.chooseItem} 
          className={`list-item row ${this.props.focus == true ? 'ft-color-green' : ''}`}>
           <a className="cover">
             <img src={this.props.item.cover} />
           </a>
           <div className="cont">
             <span className="title">{this.props.item.title}</span>
             <p className="artist">{this.props.item.artist}</p>
           </div>
        </li>
      )
    }
});

export default ListItem;