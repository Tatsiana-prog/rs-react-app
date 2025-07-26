import React, { Component } from 'react';

interface ButtonErrorProps {
  buttonText: string;
  onClick?: () => void;
}

class ButtonError extends Component<ButtonErrorProps> {
  throwError = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    throw new Error('Something went wrong.');
  };

  render() {
    const { buttonText } = this.props;

    return (
      <div>
        <button onClick={this.throwError} style={{ marginTop: '20px' }}>
          {buttonText}
        </button>
      </div>
    );
  }
}

export default ButtonError;