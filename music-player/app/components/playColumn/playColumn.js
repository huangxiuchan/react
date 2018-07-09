import React from 'react'
import ListItem from './listItem'
import './playColumn.less'

let playColumn = React.createClass({
  render() {
    return (
      <div className="playColumn-component">
        <div className="musicItem">
            <div className="cont">
              <span className="title">{this.props.item.title}</span>
              <p className="artist">{this.props.item.artist}</p>
            </div>
        </div>
        <div className="operate">
           <a className={`m_icon ${this.state.isPlay ? 'play' : 'pause'}`} onClick={this.isPlayStateChange}></a>
        </div>
      </div>
    );
  }
});

export default playColumn;