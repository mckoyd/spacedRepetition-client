import React from 'react';
import {connect} from 'react-redux';


const mapStateToProps = state => ({
  protectedData: state.protectedData.data
});

export class Input extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>;
    }

    let warning;
    if (this.props.meta.touched && this.props.meta.warning) {
      warning = (
        <div className="form-warning">{this.props.meta.warning}</div>
      );
    }
    let answerFeedback;
    if(this.input){
      this.input.value===this.props.protectedData.enWord ? answerFeedback = (
        <div className="feedback">RIGHT!</div>
      ) : console.log('nope');
      
    }
    const errorStyle = {
      border: 'red 2px solid'
    };
    return (
      <div className="form-input">
        <label htmlFor={this.props.input.name}>
          {this.props.label}
          {error}
          {warning}
          {answerFeedback}
        </label>
        <input
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
          style={error ? errorStyle : null}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Input);
