import React from 'react'
import './progress.less'

let Progress = React.createClass({
  changeProcress(e) {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onChangeProgress && this.props.onChangeProgress(progress);
  },
  render() {
    return (
      <div className="progress-component" ref="progressBar" onClick={this.changeProcress}
         style={{height:`${this.props.height}`}}>
         <div className="progress" style={{width: `${this.props.progress}%`
         ,backgroundColor:`${this.props.barColor}`
         ,height:`${this.props.height}`}}>
         </div>
      
      </div>
    );
  }
});

export default Progress;