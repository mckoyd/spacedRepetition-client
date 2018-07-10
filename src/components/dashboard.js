import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import '../styles/dashboard.css';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
                    Username: {this.props.username}
        </div>
        <div className="dashboard-name">Name: {this.props.name}</div>
        <div className="dashboard-protected-data">
                    Question ID: {this.props.protectedData._id}
        </div>
        <div className="question-box">
          <h2>There's a {this.props.protectedData.svWord}, ARRRRRGGG!!</h2>
          <img src={this.props.protectedData.imgSrc} />
          <h3>What is a {this.props.protectedData.svWord}?</h3>
          {/* <video controls="" autoplay="" name="media">
            <source src={this.props.protectedData.audioUrl} type="audio/mpeg" />
          </video> */}
          <label htmlFor="answer">Answer: </label>
          <Field component={Input} type="text" name="answer" />
          <button disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.handleSubmit(value => console.log(value))}>
                    Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  name: state.auth.currentUser.displayName,
  protectedData: state.protectedData.data
});

export default requiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'answer',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('answer', Object.keys(errors)[0]))
})(Dashboard)));
