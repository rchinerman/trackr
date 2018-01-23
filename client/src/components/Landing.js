import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Image } from 'react-bootstrap';
import '../styles/Landing.css';

const HeaderFont = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '3.5em',
  color: 'white'
};

const UnderFont = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '1.2em',
  color: 'white'
};

class Landing extends Component {

  render(){
    return (
      <div>
        <div className="body-background">
        </div>
        <div style={{ textAlign: 'center' }}>
          <Image style={{ height: '8em' }} src="https://i.imgur.com/L4rJNjS.png" />
          <h1 style={ HeaderFont }>
            Trackr
          </h1>
          <p style={ UnderFont }>
            follow your friends
          </p>
        </div>
      </div>
    )
  }
}

export default connect(null, actions)(Landing);