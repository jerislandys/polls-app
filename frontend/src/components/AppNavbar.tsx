import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';

import Logout from './auth/Logout';
import { IAppNavbar, IAuthReduxProps } from '../types/interfaces';

const AppNavbar = ({ auth }: IAppNavbar) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {auth && auth.user ? `Welcome ${auth.user.name}` : ''}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link to="/register">
          Register
        </Link>
      </NavItem>
      &nbsp;&nbsp;&nbsp;
      <NavItem>
        <Link to="/login">
          Login
        </Link>
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Polls App</NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {auth && auth.isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
