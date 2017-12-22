import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Landing extends Component {

  render(){
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>
          Stalkr
        </h1>
      </div>
    )
  }
}

export default connect(null, actions)(Landing);