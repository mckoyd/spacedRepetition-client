import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import requiresLogin from './requires-login';
import {fetchProtectedData, postAnswer} from '../actions/protected-data';
import '../styles/dashboard.css';
import { changeToNext, changeToSubmit, getAnswer, resetAnswer } from '../actions';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  render() {
    const errorStyle = {
      border: 'red 2px solid'
    };
    return (
      <div className="dashboard">
        <div className="dashboard-username">
                    Username: {this.props.username}
        </div>
        <div className="dashboard-name">Name: {this.props.name}</div>
        <div className="dashboard-protected-data">
        </div>
        <form className="question-box"
          onSubmit={this.props.handleSubmit(value => {
            if(this.props.buttonText === 'SUBMIT'){
              this.props.dispatch(changeToNext());
              this.props.dispatch(getAnswer(value.answer));
              const answer = {'correct': value.answer === this.props.protectedData.enWord};
              console.log(answer);
              this.props.dispatch(postAnswer(answer));
            } else if (this.props.buttonText === 'NEXT'){
              this.props.reset();
              this.props.dispatch(resetAnswer());
              this.props.dispatch(fetchProtectedData());
              this.props.dispatch(changeToSubmit());
            }
          })}>
          <h2>There's a {this.props.protectedData.svWord}, ARRRRRGGG!!</h2>
          <img src={this.props.protectedData.imgSrc} />
          <h3>What is a {this.props.protectedData.svWord}?</h3>
          {/* <video controls="" autoplay="" name="media">
            <source src={this.props.protectedData.audioUrl} type="audio/mpeg" />
          </video> */}
          <label htmlFor="answer">Answer: </label>
          <Field component={Input} type="text" name="answer" />
          <button disabled={this.props.pristine || this.props.submitting}>
            {this.props.buttonText}
          </button>
          <h3>{this.props.answer===this.props.protectedData.enWord ? 'Right!' :
            this.props.answer==='' ? null : 'Wrong!' }</h3>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  name: state.auth.currentUser.displayName,
  protectedData: state.protectedData.data,
  buttonText: state.main.buttonText,
  answer: state.main.answer
});

export default requiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'answer',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('answer', Object.keys(errors)))
})(Dashboard)));
