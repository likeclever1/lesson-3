import React, {Component} from 'react';
import Title from './Title';
import './CardForm.css';

export class CardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftTime: 120
    };

    props.onChangeTimeOver(false);

    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  componentDidMount() {
    this.id = setInterval(function() {
      const leftTime = Math.max(this.state.leftTime - 1, 0);
      if (leftTime === 0 && this.state.leftTime === 1) {
        this.props.onChangeTimeOver(true);
        clearInterval(this.id);
      }
      this.setState({leftTime});
    }.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.id);
  }

  handleChangeForm(e) {
    const {
      onChangeForm
    } = this.props;

    onChangeForm(e.target.name, e.target.value);
  }

  render() {
    const {
      leftTime
    } = this.state;

    const {
      cardNumber
    } = this.props;

    return (
      <div className="card-form">
        <Title>Номер карты</Title>
        <input value={ cardNumber } name="cardNumber" type="text" placeholder="0000000000000000"
          onChange={ this.handleChangeForm } />
        <p className="left-time">Осталось {leftTime} секунд</p>
      </div>
    );
  }
}

export default CardForm;
