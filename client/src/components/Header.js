import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, MenuItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/Header.css';

const HeaderFont = {
  fontFamily: 'Montserrat, sans-serif'
};

const font = {
  fontFamily: 'Open Sans, sans-serif',
};

const nav = {
  background: '#B993D6',  /* fallback for old browsers */
  background: '-webkit-linear-gradient(to right, #8CA6DB, #B993D6)',  /* Chrome 10-25, Safari 5.1-6 */
  background: 'linear-gradient(to right, #8CA6DB, #B993D6)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  borderRadius: '0',
  border: 'none'
}

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
        return  <Nav style={font}>
                  <LinkContainer to='/about'>
                    <NavItem eventKey={3}>About</NavItem>          
                  </LinkContainer> 
                </Nav>    
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
        <Navbar inverse collapseOnSelect style={nav}>
        <Navbar.Header style={HeaderFont}>
            <Navbar.Brand>
              <LinkContainer to='/'>
                <Image src="https://i.imgur.com/L4rJNjS.png" />
              </LinkContainer>
            </Navbar.Brand>
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