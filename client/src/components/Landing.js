import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const HeaderFont = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '100px'
};

class Landing extends Component {

  render(){
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 style={ HeaderFont }>
          Trackr
        </h1>
        </div>
    )
  }
}

export default connect(null, actions)(Landing);