import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import '../styles/header-bar.css';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button onClick={() => this.logOut()}>Log out</button>
      );
    }
    return (
      <div className="header-bar">
        <hgroup>
          <h1>The Swedish Farm Yard</h1>
          <h2>A Place to Learn to Speak Swedish</h2>
        </hgroup>
        {logOutButton}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);
