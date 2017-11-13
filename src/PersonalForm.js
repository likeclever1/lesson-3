import React, {Component} from 'react';
import Title from './Title';
import './PersonalForm.css';

export class PersonalForm extends Component {
  constructor() {
    super();

    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  handleChangeForm(e) {
    const {
      onChangeForm
    } = this.props;

    onChangeForm(e.target.name, e.target.value);
  }

  render() {
    const {
      firstName,
      lastName,
      email
    } = this.props;

    return (
      <div className="personal-form">
        <Title>Персональная информация</Title>
        <input value={ firstName } name="firstName" type="text" placeholder="firstName"
          onChange={this.handleChangeForm}
        />
        <input value={ lastName } name="lastName" type="text" placeholder="lastName"
          onChange={this.handleChangeForm}
        />
        <input value={ email } name="email" type="text" placeholder="email"
        onChange={this.handleChangeForm}
        />
      </div>
    );
  }
}

export default PersonalForm;
