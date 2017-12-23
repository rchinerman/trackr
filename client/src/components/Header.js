import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HeaderFont = {
  fontFamily: 'Montserrat, sans-serif'
};

const font = {
  fontFamily: 'Open Sans, sans-serif'
};

class Header extends Component {
  renderLogin(){
    switch (this.props.auth){
      case null:
        return null;
      case false:
        return <MenuItem style={font} href="/auth/google">Login</MenuItem>;        
      default:
        return <MenuItem style={font} href="/api/logout">Logout</MenuItem>;
    }
  }

  renderNav(){
    switch (this.props.auth){
      case null:
        return null;
      case false:
        return;        
      default:
        return  <Nav style={font}>
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
        <Navbar inverse collapseOnSelect>
        <Navbar.Header style={HeaderFont}>
          <LinkContainer to='/'>
            <Navbar.Brand>
              Trackr
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
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