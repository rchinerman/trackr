import React, { Component } from 'react';
import { Panel, Accordion } from 'react-bootstrap';

const font = {
  fontFamily: 'Open Sans, sans-serif',
  textAlign: 'center'
};

class About extends Component {
  render() {
    return (
      <Accordion>
        <Panel header="What is Trackr?" eventKey="1">
          Trackr is a website that allows users to easily view the rankings of summoners they choose to follow.
        </Panel>
        <Panel header="Why do I need to log in?" eventKey="2">
          Having user accounts makes it easy to maintain your list so it's there every time you visit the website.
        </Panel>
        <Panel header="Is logging in safe?" eventKey="3">
          User authentication on Trackr is done using Google's OAuth 2.0, and Trackr is only able to see basic information regarding your Google+ account.
        </Panel>
        <Panel header="Legal Disclaimer" eventKey="4">
          Trackr isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
        </Panel>
      </Accordion>
    )
}
}

export default About;