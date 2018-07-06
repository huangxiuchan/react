import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './root'


// var routes = (
//   <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
//     <Route path="/" component={Hello} />
//   </Router>
// );



render(
  <AppContainer>
      <Root/>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./root', () => {
    const Root = require('./root').default;
    render(
      <AppContainer>
          <Root/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}