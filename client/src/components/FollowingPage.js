import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import FollowingList from './FollowingList';

class Landing extends Component {
  componentDidMount(){
    this.props.fetchFollowingList();
  }
  render(){
    return (
      <FollowingList></FollowingList>
    )
  }
}

export default connect(null, actions)(Landing);