import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import '../styles/home.css';

import LoginForm from './login-form';

export function LandingPage(props) {
  // If we are logged in redirect straight to the user's dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="home">
      <h2>Welcome...New Swedish Speakers</h2>
      <h3>Log In Below To Continue Learning</h3>
      <LoginForm />
      <div>
        <h3>Not a member...sign up below</h3>
        <Link to="/register" className='register-link'>Register</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
