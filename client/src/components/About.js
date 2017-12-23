import React, { Component } from 'react';

const font = {
  fontFamily: 'Open Sans, sans-serif',
  textAlign: 'center'
};

class About extends Component {

  render(){
    return (
      <div style={ font }>
        <p>Trackr isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
      </div>
    )
  }
}

export default About;