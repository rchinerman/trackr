import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import FollowingPage from './FollowingPage';
import Follow from './Follow';

const Dashboard = () => <h2>Dashboard</h2>
const List = () => <h2>List</h2>

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return(
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route exact path="/" component={Landing} />
            <Route exact path="/dashboard" component={FollowingPage} />
            <Route exact path="/follow" component={Follow} />
          </div>
        </div>
      </BrowserRouter>
    )};
};

export default connect(null, actions)(App);