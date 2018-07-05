import React from 'react'
import './header.less'
let Header = React.createClass({

  render() {
    return (
      <div className="header-component main">
        <span className="title  text-overflow">Music Player</span>
      </div>
    );
  }
});

export default Header;