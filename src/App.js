import React, {Component} from 'react';
import './App.css';
import Step from './Step';
import PersonalForm from './PersonalForm';
import CardForm from './CardForm';

const stepTitles = ['Personal information', 'Card information', 'Finish'];

class App extends Component {
  constructor() {
    super();

    this.state = {
      step: 1,
      isTimeOver: false,
      firstName: '',
      lastName: '',
      email: '',
      cardNumber: ''
    }

    this.handleTabClick = this.handleTabClick.bind(this);
    this.isFormCommitable = this.isFormCommitable.bind(this);
    this.handleClickNextForm = this.handleClickNextForm.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleChangeTimeOver = this.handleChangeTimeOver.bind(this);
  }

  handleTabClick(step) {
    this.setState({
      step
    });
  }

  handleChangeForm(field, value) {
    let temp = {};
    temp[field] = value;

    this.setState({
      ...temp
    });
  }

  handleClickNextForm() {
    const {
      step
    } = this.state;

    this.setState({
      step: step+1
    });
  }

  handleChangeTimeOver(value) {
    this.setState({
      isTimeOver: value
    });
  }

  isFormCommitable() {
    const {
      step,
      firstName,
      lastName,
      email,
      cardNumber
    } = this.state;

    switch(step) {
      case 1: {
        if (firstName !== '' &&
          lastName !== '' &&
          email !== '' &&
          email.indexOf('@') > -1
        )  {
          return true;
        }

        return false;
      }
      case 2: {
        if (cardNumber.length === 16) {
          return true;
        }

        return false;
      }
      default:
        return false;
    }
  }

  renderForm() {
    const {
      step,
      firstName,
      lastName,
      email,
      cardNumber,

    } = this.state;

    switch(step) {
      case 1:
        return (
          <PersonalForm
            firstName={ firstName }
            lastName={ lastName }
            email={ email }
            onChangeForm={ this.handleChangeForm } />
        );
      case 2:
        return (
          <CardForm
            cardNumber={ cardNumber }
            onChangeForm={ this.handleChangeForm }
            onChangeTimeOver={ this.handleChangeTimeOver } />
        );
      case 3:
        return 'Поздравляем!';
      default:
        return 'Что-то пошло не так';
    }
  }

  render() {
    const {
      step,
      isTimeOver
    } = this.state;

    return (
      <div className="container">
        <div className="tab-panel">
        {step === 1 && 
          stepTitles.map((title, index) => (
            <Step
                key={ title }
                onClick={ this.handleTabClick }
                isSelected={ index === 0 ? true : false }
                number={ index+1 }
                isClickable={ false }>

                { title }
              </Step>
          ))}

        {step === 2 && 
          stepTitles.map((title, index) => (
            <Step
              key={ title }
              onClick={ this.handleTabClick }
              isSelected={ index === 1 ? true : false }
              number={ index+1 }
              isClickable={ index === 0 ? true : false }>
          
              { title }
            </Step>
          ))}

        {step === 3 && 
          stepTitles.map((title, index) => (
            <Step
              key={ title }
              onClick={ this.handleTabClick }
              isSelected={ index === 2 ? true : false }
              number={ index+1 }
              isClickable={ index === 2 ? false : true }>

              { title }
            </Step>
          ))}
        </div>
        
        <div className="form-content">
          {this.renderForm()}
        </div>
        
        <div className="button-panel">
          <button className="button-next"
            disabled={ !this.isFormCommitable() || isTimeOver }
            onClick={ this.handleClickNextForm }
            >Next</button>
        </div>
      </div>
    );
  }
}

export default App;
