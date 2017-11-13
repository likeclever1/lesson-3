import React, {PureComponent} from 'react';
import cx from 'classnames';

import './Step.css';

class Step extends PureComponent {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      onClick,
      isClickable,
      number
    } = this.props;

    if (isClickable) {
      onClick(number);
    }
  }

  render() {
    const {
      isSelected,
      isClickable,
      number,
      children
    } = this.props;

    const stepClass = cx({
      step: true,
      "step-selected": isSelected,
      "step-clickable": isClickable
    });

    return (
      <div className={stepClass} onClick={ this.handleClick }>
        <div className="step__number">
          { number }
        </div>
        <div className="step__title">
          { children }
        </div>
      </div>
    );
  }
}

export default Step;
