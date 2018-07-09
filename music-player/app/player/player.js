import React from 'react'
import Progress from '../components/progress/progress'
import InnerHeader from '../components/header/innerHeader'
import './player.less'
import { Link } from 'react-router'
import PubSub from 'pubsub-js'

let duration = null;
let Player = React.createClass({
  getInitialState() {
    return {
      progress: 0,
      volume:0,
      durationTime : 0,
      totleTime : 0,
      currentItem: this.props.musicListItem,
    };
  },
  componentWillMount() {
    console.log($.jPlayer.event);
    $('#player').bind($.jPlayer.event.loadeddata, (e) => {
      this.setState({
        durationTime:this.secondToDate(duration * e.jPlayer.status.currentPercentAbsolute * 0.01),
        totleTime: this.secondToDate( e.jPlayer.status.duration)
      })
    });
  },
  componentDidMount() {
    
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration; //时间
      this.setState({
        durationTime:this.secondToDate(duration * e.jPlayer.status.currentPercentAbsolute * 0.01),
        totleTime: this.secondToDate( e.jPlayer.status.duration),
        volume: e.jPlayer.options.volume * 100,
        progress: e.jPlayer.status.currentPercentAbsolute
      })
    })
  },
  componentWillUnmount() {
    $("#player").unbind($.jPlayer.event.timeupdate);
    $("#player").unbind($.jPlayer.event.loadeddata);
	},
  changeProgressHandler(progress) {
    $('#player').jPlayer('play', duration * progress);
  },
  changeVoiceHandler(progress) {
    $('#player').jPlayer('volume', progress);
  },
  isPlayStateChange() {
    PubSub.publish('isPlayStateChange')
  },
  preMusic(){
    PubSub.publish('preMusic')
  },
  nextMusic(){
    PubSub.publish('nextMusic')
  },
  changePlayMode(){
    
    PubSub.publish('Play_Mode')
  },
  secondToDate(result){
   // let h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result =  m + ":" + s;
  },
  render() {
    return (
      <div>
        <InnerHeader musicListItem={this.props.musicListItem}></InnerHeader>
        <div className="player-component clearfix">
          <div className="background">
             <img src={this.props.musicListItem.cover} />
          </div>
          <h4 className="artist">{this.props.musicListItem.artist}</h4>
          <div className="cont clearfix">
            <div className="img-box">
              <div className="cover">
                <img className={`${this.props.isPlay ? 'animate' : ''}`} src={this.props.musicListItem.cover}/>
                <span className="cover-yq"></span>
              </div>
            </div>
            <div className="words">
              <p>歌词：无下载</p>
            </div>
          </div>
          <div className="flex-bottom">
            
            <div className="voice">
              <img className="icon" src={require('../../static/images/rank.png')} />
              <span className="voice-bar">
                <Progress  
                  progress={this.state.volume}
                  barColor='#999'
                  height='2px'
                  onChangeProgress={this.changeVoiceHandler}
                />
              </span>
              <a className={`mode ${this.props.repeatType}`} onClick={this.changePlayMode}>
              </a>
            </div>
            <div className="progress-cont row">
              <span className="duration-time">{this.state.durationTime}</span>
              <Progress  
                progress={this.state.progress} 
                barColor='rgb(2, 161, 63)' 
                height='4px'
                onChangeProgress={this.changeProgressHandler}
              />
              <span className="totle-time">{this.state.totleTime}</span>
            </div>

            <div className="menu-box row">
              <span className="m_icon back" onClick={this.preMusic}></span>
              <span className={`m_icon ${this.props.isPlay ? 'play' : 'pause'}`} onClick={this.isPlayStateChange}></span>
              <span className="m_icon next" onClick={this.nextMusic}></span>
              <Link to="/"><span className="m_icon menu"></span></Link>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
});

export default Player;