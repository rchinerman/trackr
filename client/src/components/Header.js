import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends Component {
  renderContent(){
    switch (this.props.auth){
      case null:
        return null;
      case false:
        return <MenuItem href="/auth/google">Login</MenuItem>;        
      default:
        return <MenuItem href="/api/logout">Logout</MenuItem>;
        
    }
  }
  render() {
    return (
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <LinkContainer to='/'>
            <Navbar.Brand>
              Stalkr
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          <LinkContainer exact to='/dashboard'>
            <NavItem eventKey={1}>Dashboard</NavItem>          
          </LinkContainer>
          <LinkContainer to='/follow'>
            <NavItem eventKey={2}>Follow</NavItem>          
          </LinkContainer>
          </Nav>
          <Nav pullRight>
            {this.renderContent()}
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