import React, { render } from 'react';
// import Header from '../components/header/header'
// import InnerHeader from '../components/header/innerHeader'
import Player from '../player/player'
import List from '../components/list/list'
import {MUSIC_LIST} from '../config/config'
import PubSub from 'pubsub-js'
import { randomRange } from '../utils/util'
import { Router, IndexRoute,Link, Route, browserHistory, hashHistory} from 'react-router'


let App = React.createClass({
  getInitialState() {
    return {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0],
      isChoose:false,
      repeatType: 'singleCycle',
      isPlay:false
    };
  },
  
  
  componentDidMount() {
    let _this = this;
    $('#player').jPlayer({
      // ready: function () {
      //   $(this).jPlayer('setMedia', {
      //     mp3:"http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
      //   }).jPlayer('play');
        
      // },
      useStateClassSkin: true,
      supplied: 'mp3',
      wmode: 'window'
    });
    // this.playMusic(MUSIC_LIST[0]);
    $("#player").jPlayer("setMedia", {
			mp3: MUSIC_LIST[0].file
    }).jPlayer('pause');


    PubSub.subscribe('chooseItem', function (msg,item) {
      _this.playMusic(item);
      _this.setState({
        isChoose:true,
        isPlay:true
      })
    })
    PubSub.subscribe('preMusic',function(){
      _this.playNext('prev');
    })
    PubSub.subscribe('nextMusic',function(){
      _this.playNext();
    })
    PubSub.subscribe('isPlayStateChange',function(){
      _this.isPlayStateChange();
    })
    let repeatList = [
			'cycle',
			'singleCycle',
			'random'
		];
		PubSub.subscribe('Play_Mode', () => {
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});
    });
    $("#player").bind($.jPlayer.event.ended, (e) => {
			this.playWhenEnd();
		});
  },
  
  componentWillUnMount(){
    PubSub.unsubscribe(chooseItem);
    PubSub.unsubscribe(preMusic);
    PubSub.unsubscribe(nextMusic);
    PubSub.unsubscribe(Play_Mode);
    PubSub.unsubscribe(isPlayStateChange);
  },

  isPlayStateChange(){
    if(this.state.isPlay){
      $('#player').jPlayer('pause');

    }else{
      $('#player').jPlayer('play');
      this.setState({
        isChoose: true
      })
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  },
  playWhenEnd(){
    if (this.state.repeatType === 'random') {
			let index = this.findIndex(this.state.currentMusicItem);
      let randomIndex = randomRange(0, this.state.musicList.length - 1);
      console.log(index + '--' + randomIndex);
			while(randomIndex === index) {
				randomIndex = randomRange(0, this.state.musicList.length - 1);
			}
			this.playMusic(this.state.musicList[randomIndex]);
		} else if (this.state.repeatType === 'singleCycle') {
			this.playMusic(this.state.currentMusicItem);
		} else {
			this.playNext();
		}
  },
  playMusic(item) {
    console.log(item);
		$("#player").jPlayer("setMedia", {
			mp3: item.file
    });
    $('#player').jPlayer('play');
    
		this.setState({
      currentMusicItem: item,
      isPlay:true,
      isChoose: true
    });
    
  },
  playNext(type) {
    let length = this.state.musicList.length;
    let item = {};
    if (type === 'prev') {
      console.log("上一首");
      let current_index = this.findIndex(this.state.currentMusicItem);
      let pre_index = current_index - 1;
      if (current_index == 0) {
        pre_index = length - 1;  //当前为第一首时，前一首就是最后一首
        
      }
      let preMusicItem = this.state.musicList[pre_index];
      item = preMusicItem;
      
    } else {
      console.log("下一首");
      let current_index = this.findIndex(this.state.currentMusicItem);
      let next_index = current_index + 1;
      if (current_index == (length - 1)){ 
        next_index = 0;  //当前为第后一首时，下一首就是第一首
      }
      let nextMusicItem = this.state.musicList[next_index];
      item = nextMusicItem;
    }
    console.log(item);
    
    this.playMusic(item); 
  },
  
  findIndex(item){
    let index = this.state.musicList.indexOf(item);
    return index;
  },
  changeMusicList(item){
    this.setState({
      musicList:item
    })
  },
  render() {
    return (
        <div className="container">
          {React.cloneElement(this.props.children, 
            {musicList: this.state.musicList, 
            musicListItem: this.state.currentMusicItem,
            changeMusicList:this.changeMusicList,
            repeatType: this.state.repeatType,
            isPlay:this.state.isPlay,
            isChoose:this.state.isChoose
            
            }
          )}
        </div>
    );
  }
  
});

let Root = React.createClass({
	render() {
	    return (
		    <Router history={hashHistory}>
		        <Route path="/" component={App}>
		            <IndexRoute component={List}>
                </IndexRoute>
		            <Route path="/player" component={Player} />
		        </Route>
		    </Router>
		);
	}
});

export default Root;