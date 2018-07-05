import React from 'react'
import ListItem from './listItem'
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import Header from '../../components/header/header'
import Sliders from '../../Sliders/Sliders';
import PlayBar from '../../components/PlayBar/PlayBar'
import './list.less'
let List = React.createClass({
  getInitialState(){
    return {
      Img:[
        require('../../../static/images/291263.jpg'),
        require('../../../static/images/291459.jpg'),
        require('../../../static/images/291263.jpg'),
        require('../../../static/images/291459.jpg'),
      ],
      isRefresh:false,
      items:this.props.musicList,
      page: 1,
      isShowLoading:false,
      isShowTip:false,
    }
  },
  componentDidMount(){
    // this.refs.MusicListCont.addEventListener("touchmove",function (e) {
    //   e.stopPropagation();
    // },false);
    console.log("componentDidMount");
  },
  componentDidUpdate() {
  },
  // onBeforeScrollStart(){
  //   console.log("onBeforeScrollStart");
  // },
  onScrollStart(){
    console.log("onScrollStart");
    this.refs.iScroll.withIScroll(function(iScroll) {
      iScroll.refresh();
    })
  },
  // onScrollCancel(){
  //   console.log("onScrollCancel");
  // },
  onScroll(iScrollInstance){
    if ((iScrollInstance.y <= iScrollInstance.maxScrollY) && this.state.isShowTip == false) {
      this.setState({
        isShowLoading:true
      })
    }
  },
  onScrollEnd(iScrollInstance){
    console.log("onScrollEnd");
    if (iScrollInstance.y <= iScrollInstance.maxScrollY +16) {
         this.fetchItems(false);    
    }
  },
  // onFlick(){
  //   console.log("onFlick");
  // },
  // onZoomStart(){
  //   console.log("onZoomStart");
    
  // },
  // onZoomEnd(){
  //   console.log("onZoomEnd");
  // },
  // onRefresh(iScrollInstance){
  //   console.log("onRefresh");
  // },
  fetchItems(isRefresh){
    console.log(isRefresh);
    if (isRefresh) {  // 刷新
        let getItem = MUSIC_LIST;
        this.setState({
          page:1,
          items:getItem,
        })
    }else {
      let ajaxItem = [{
        id: 7,
        title: '天使中的魔鬼',
        artist: '田馥甄',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.jpg'
      }, {
        id: 8,
        title: '风继续吹',
        artist: '张国荣',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.jpg'
      }, {
        id: 9,
        title: '恋恋风尘',
        artist: '老狼',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%81%8B%E6%81%8B%E9%A3%8E%E5%B0%98.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%81%8B%E6%81%8B%E9%A3%8E%E5%B0%98.jpg'
      }, {
        id: 10,
        title: '我要你',
        artist: '任素汐',
        file: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.mp3',
        cover: 'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.jpg'
      }];
      console.log(this.state.page)
      if(this.state.page != 2 && ajaxItem){
        let p = this.state.page + 1;
        this.setState({
          items:this.state.items.concat(ajaxItem),
          page:p
        })

      }else if(this.state.page == 2){
        this.setState({
          isShowLoading:false,
          isShowTip:true,
        })
      }
      
    }
    
    this.changeMusicList(this.state.items);
  },
  changeMusicList(items){
    this.props.changeMusicList(items)
  },
  render() {
    let listELe = null;
    listELe = this.props.musicList.map((item) => {
      return (
        <ListItem 
          key={item.id}
          item={item}
          focus={this.props.musicListItem === item && this.props.isChoose}
          
        />
      )
    });
    return (
      <div>
        <Header/>
        
        <div className={`list-component-cont ${this.props.isChoose ? 'hasPlayBar' : ''}`} ref="MusicListCont">
          <ReactIScroll ref="iScroll" iScroll={iScroll}  options={this.props.options}
          onScrollStart={this.onScrollStart}
          onScroll={this.onScroll}
          onScrollEnd={this.onScrollEnd}
     
          >
            <div className="scroll-cont">
              <Sliders
                    images={this.state.Img}
                    speed={1}
                    delay={4}
                    autoPlay={false}
                    autoParse={true}
              />
              <div className="list-component">
                <h2>热门歌曲推荐</h2>
                <ul>
                  { listELe }

                  <div className={`LoadMore ${this.state.isShowTip == true ? '' : 'hide'}`}>
                    <span>已到底~</span>
                  </div>

                  <div className={`LoadMore ${this.state.isShowLoading == true ? '' : 'hide'}`}>
                    <img src={require('../../../static/images/loading.gif')} />
                  </div>
                </ul>
                
              </div>
            </div>
          </ReactIScroll>
          <PlayBar musicListItem = {this.props.musicListItem} isPlay = {this.props.isPlay} isChoose = {this.props.isChoose} />
        </div>
        
      </div>
    );
  }
});
List.defaultProps = {
  options: {
      mouseWheel: false,
      scrollbars: false,
      bounce: true,
      preventDefault: false,
      probeType: 3,
      zoom: false,
  }
}
export default List;