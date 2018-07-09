import React from 'react'
import './PlayBar.less'
import { Link } from 'react-router'
import PubSub from 'pubsub-js'

let PlayBar = React.createClass({

  isPlayStateChange() { 
    PubSub.publish('isPlayStateChange')
  },
  render(){
    return (
      <div className={`PlayBar-component  row ${this.props.isChoose ? 'hasPlayBar' : ''}`}>
          <Link className="link-cont" to = '/player'>
              <img className={`${this.props.isPlay ? 'animate' : ''}`} src={this.props.musicListItem.cover} />
              <div className="text">
                <span className="title">{this.props.musicListItem.title}</span>
                <span className="artist">{this.props.musicListItem.artist}</span>
              </div>
          </Link>
          <i className={`icon m_icon ${this.props.isPlay ? 'play' : 'pause'}`} onClick={this.isPlayStateChange}></i>
      </div>
    );
  }
})

export default PlayBar;