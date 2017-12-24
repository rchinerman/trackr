import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import FollowingPage from './FollowingPage';
import Follow from './Follow';
import About from './About';

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return(
      <HashRouter>
        <div>
          <Header />
          <div className="container">
              <Route exact path="/" component={Landing} />
              <Route path="/dashboard" component={FollowingPage} />
              <Route path="/follow" component={Follow} />
              <Route path="/about" component={About} />
          </div>
        </div>
      </HashRouter>
      
    )};
};

export default connect(null, actions)(App);