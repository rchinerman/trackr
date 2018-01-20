import React, { Component } from 'react';
import { Panel, Accordion, Col } from 'react-bootstrap';

const font = {
  fontFamily: 'Montserrat, sans-serif',
};

class About extends Component {
  render() {
    return (
      <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
        <Accordion>
          <Panel header="What is Trackr?" eventKey="1">
            Trackr is a website that allows users to easily view the rankings of summoners they choose to follow.
          </Panel>
          <Panel header="Why do I need to log in?" eventKey="2">
            Having user accounts makes it easy to keep track of what information to show to which users, so you don't lose the list you create.
          </Panel>
          <Panel header="Is logging in safe?" eventKey="3">
            User authentication on Trackr is done using Google's OAuth 2.0, and Trackr is only able to see basic information regarding your Google+ account.
          </Panel>
          <Panel header="How do I follow someone?" eventKey="4">
            You can follow someone by first logging in, and then clicking the Follow link at the top of the website. Type in the summoner name of the player you'd like to follow, select the region they play in, and click Follow.
          </Panel>
          <Panel header="Legal Disclaimer" eventKey="5">
            Trackr isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
          </Panel>
        </Accordion>
      </Col>
    )
}
}

export default About;