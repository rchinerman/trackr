import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import HomeHeader from './HomeHeader';
import FollowingPage from './FollowingPage';
import Follow from './Follow';
import About from './About';

const DetermineHeader = ({ match }) => {
  if(match.params.id !== 'home'){
    return <Header />
  }
  else{
    return <HomeHeader />
  }
}

class App extends Component {
  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return(
      <BrowserRouter>
        <div>
        <Route path="/:id" component={DetermineHeader}/>
        <div className="container">
            <Route exact path="/home" component={Landing} />
            <Route exact path="/dashboard" component={FollowingPage} />
            <Route exact path="/follow" component={Follow} />
            <Route exact path="/about" component={About} />
          </div>
        </div>
      </BrowserRouter>
      
    )};
};

export default connect(null, actions)(App);