import React from 'react'
import './header.less'
import { Link } from 'react-router';
let Header = React.createClass({

  render() {
    return (
      <div className="header-component row">
        <Link to="/" className="-col-auto"><img className="icon " src={require('../../../static/images/arrow-down.png')} /></Link>
        <span className="title  text-overflow">{this.props.musicListItem.title}</span>
      </div>
    );
  }
});

export default Header;