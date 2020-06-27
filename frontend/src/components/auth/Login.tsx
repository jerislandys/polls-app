import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';
import { ILoginModal, ITarget, IAuthReduxProps } from '../../types/interfaces';

const Login = ({
  isAuthenticated,
  error,
  login,
  clearErrors
}: ILoginModal) => {
  const [modal, setModal] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  const handleChangeEmail = (e: ITarget) => setEmail(e.target.value);
  const handleChangePassword = (e: ITarget) => setPassword(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const user = { email, password };

    // Attempt to login
    login(user);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  return (
    <div>
      {/* <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink> */}

      <Modal isOpen={modal}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleChangeEmail}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleChangePassword}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
                onClick={handleOnSubmit}
              >
                Login
              </Button>
              <Link to="/">
                <Button color="danger" style={{ marginTop: '2rem' }} block>
                  Cancel
                </Button>
              </Link>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: IAuthReduxProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
