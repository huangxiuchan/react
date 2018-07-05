import React, { render } from 'react';
// import Header from '../components/header/header'
// import InnerHeader from '../components/header/innerHeader'
import Player from '../player/player'
import List from '../components/list/list'
import {MUSIC_LIST} from '../config/config'
import PubSub from 'pubsub-js'
import { Router, IndexRoute,Link, Route, browserHistory, hashHistory} from 'react-router'


let App = React.createClass({
  getInitialState() {
		console.log("getInitialState");
    return {
      musicList: MUSIC_LIST,
			currentMusicItem:{},
		};
  },
  
  componentDidMount() {
		console.log("componentDidMount");
		$("#player").jPlayer({
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});

		this.playMusic(MUSIC_LIST[0]);
		
		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playWhenEnd();
		});
		PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
			this.playMusic(item);
		});
		PubSub.subscribe('PLAY_NEXT', () => {
			this.playNext();
		});
		PubSub.subscribe('PLAY_PREV', () => {
			this.playNext('prev');
		});

		PubSub.subscribe('Play_Mode', () => {
			this.playMusic(this.state.musicList[1]);
		});
		
  },
  componentWillUnMount(){
		console.log("componentWillUnMount");
    PubSub.unsubscribe('PLAY_MUSIC');
		PubSub.unsubscribe('PLAY_NEXT');
		PubSub.unsubscribe('PLAY_PREV');
  },
  playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusicItem);
		if (type === 'next') {		
			index = (index + 1) % this.state.musicList.length;
		} else {
			index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
		}
		let musicItem = this.state.musicList[index];
		// this.setState({
		// 	currentMusicItem: musicItem
		// });
		this.playMusic(musicItem);
	},
	findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	},
	playMusic(item) {
		$("#player").jPlayer("setMedia", {
			mp3: item.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem: item
		});
	},
  render() {
		console.log("app_rend");
		console.log(this.state.currentMusicItem);
    return (
        <div className="container">
          {React.cloneElement(this.props.children, {musicList: this.state.musicList, musicListItem: this.state.currentMusicItem})} 
        </div>
    );
  }
  
});

let Root = React.createClass({
	render() {
		console.log("root_rend");
	    return (
		    <Router history={hashHistory}>
		        <Route path="/" component={App}>
		            <IndexRoute component={Player}>
                </IndexRoute>
		            <Route path="/list" component={List} />
		        </Route>
		    </Router>
		);
	}
});

export default Root;