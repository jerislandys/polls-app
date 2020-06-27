import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AppNavbar from './components/AppNavbar';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './flux/store';
import { loadUser } from './flux/actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact strict render={
          () => {
            return (
              <div>
                <AppNavbar />
                <Container>
                </Container>
            </div>
            )
          }
        }/>
        <Route path="/register" exact strict component={Register}/>
        <Route path="/login" exact strict component={Login}/>
      </Router>
    </Provider>
  );
};

export default App;
