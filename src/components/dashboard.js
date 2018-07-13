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
    // const errorStyle = {
    //   border: 'red 2px solid'
    // };
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          <h2>Välkommen,</h2>
        </div>
        <div className="dashboard-name"><h2>{this.props.name}!</h2></div>
        <div className="dashboard-protected-data">
        </div>
        <form className="question-box"
          onSubmit={this.props.handleSubmit(value => {
            if(this.props.buttonText === 'SUBMIT'){
              this.props.dispatch(changeToNext());
              this.props.dispatch(getAnswer(value.answer));
              const answer = {'correct': value.answer === this.props.protectedData.enWord};
              this.props.dispatch(postAnswer(answer));
            } else if (this.props.buttonText === 'NEXT'){
              this.props.reset();
              this.props.dispatch(resetAnswer());
              this.props.dispatch(fetchProtectedData());
              this.props.dispatch(changeToSubmit());
            }
          })}>
          <h2>Watch out there's a {this.props.protectedData.svWord}! Wait...</h2>
          <img src={this.props.protectedData.imgSrc} alt={this.props.protectedData.svWord}/>
          <h3>{this.props.name}, do you know what a {this.props.protectedData.svWord} is?</h3>
          {/* <video controls="" autoplay="" name="media">
            <source src={this.props.protectedData.audioUrl} type="audio/mpeg" />
          </video> */}
          <label htmlFor="answer">Answer: </label>
          <Field component={Input} type="text" name="answer" />
          <button disabled={this.props.pristine || this.props.submitting}>
            {this.props.buttonText}
          </button>
          <h4>{this.props.answer===this.props.protectedData.enWord ? 'That\'s right, this is a ' + this.props.protectedData.enWord + ' in English! Move on the next animal...' 
          + 'You\'re percentage right for this question is ' +  ((this.props.protectedData.timesCorrect + 1)/(this.props.protectedData.timesAnswered + 1)*100).toFixed(0) + '%.':
            this.props.answer==='' ? null : 'Sorry this is a ' + this.props.protectedData.enWord + ' in English! Try the next animal...'
            + 'You\'re percentage right for this question is ' +  ((this.props.protectedData.timesCorrect)/(this.props.protectedData.timesAnswered + 1)*100).toFixed(0) + '%.'
          }</h4>
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
