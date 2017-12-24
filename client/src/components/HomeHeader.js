import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/Header.css';

class Header extends Component {
  renderLogin(){
    switch (this.props.auth){
      case null:
        return null;
      case false:
        return <MenuItem href="/auth/google">Login</MenuItem>;        
      default:
        return <MenuItem href="/api/logout">Logout</MenuItem>;
    }
  }

  renderNav(){
    switch (this.props.auth){
      case null:
        return null;
      case false:
        return;        
      default:
        return  <Nav>
                  <LinkContainer exact to='/dashboard'>
                    <NavItem eventKey={1}>Dashboard</NavItem>          
                  </LinkContainer>
                  <LinkContainer to='/follow'>
                    <NavItem eventKey={2}>Follow</NavItem>          
                  </LinkContainer>
                  <LinkContainer to='/about'>
                    <NavItem eventKey={3}>About</NavItem>          
                  </LinkContainer>
                </Nav>
    }
  }

  render() {
    return (
        <Navbar inverse collapseOnSelect className="home-header-nav">
        <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to='/home'>
                <Image src="https://i.imgur.com/L4rJNjS.png" />
              </LinkContainer>
            </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse className="header-navbar-pages">
          {this.renderNav()}
          <Nav pullRight>
            {this.renderLogin()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);