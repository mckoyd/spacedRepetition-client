import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import requiresLogin from './requires-login';
import {fetchProtectedData} from '../actions/protected-data';
import '../styles/dashboard.css';

export class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentAnswer: '',
      feedback: undefined,
    }

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAnswerSubmit = this.handleAnswerSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.dispatch(fetchProtectedData());
  }

  handleAnswerChange(event) {
    this.setState({currentAnswer: event.target.value})
  }

  handleAnswerSubmit(event){
    event.preventDefault();
    if(this.state.currentAnswer === this.props.protectedData.enWord){
      this.setState({feedback: 'Correct'});
    } else {
      this.setState({feedback: 'Incorrect'});
    }
  }

  render() {
    let answer;

    let feedbackText;
    if(this.state.feedback !== undefined){
      feedbackText = this.state.feedback;
    }

    return (
      <div className="dashboard">
        <div className="dashboard-username">
                    Username: {this.props.username}
        </div>
        <div className="dashboard-name">Name: {this.props.name}</div>
        <div className="dashboard-protected-data">
                    Question ID: {this.props.protectedData._id}
        </div>
        <form className="question-box"
          onSubmit={this.props.handleSubmit(value => {
            answer = value.answer;
            console.log(answer);
          })}>
          <h2>There's a {this.props.protectedData.svWord}, ARRRRRGGG!!</h2>
          <img src={this.props.protectedData.imgSrc} alt=''/>
          <h3>What is a {this.props.protectedData.svWord}?</h3>
          {/* <audio controls autoplay name="media">
            <source src={this.props.protectedData.audioUrl} type="audio/mpeg">
          </audio> */}


          <form onSubmit={this.handleAnswerSubmit}>
            <label htmlFor="answer">Answer: </label>
            <input type="text" name="currentAnswer" value={this.state.currentAnswer} 
              onChange={this.handleAnswerChange}/>
            <button disabled={false} type='submit'>
              Submit
            </button>
          </form>

          <button onClick={() => {
            this.setState({feedback: '', currentAnswer: ''});
            this.props.dispatch(fetchProtectedData())
          }}>
            Next
          </button>
          <div className='feedback'>
            {feedbackText}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  name: state.auth.currentUser.displayName,
  protectedData: state.protectedData.data,
});

export default requiresLogin()(connect(mapStateToProps)(reduxForm({
  form: 'answer',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('answer', Object.keys(errors)))
})(Dashboard)));
