import React, { Component } from 'react';

interface ButtonErrorProps {
  buttonText: string;
  onClick?: () => void;
}

interface ButtonErrorState {
  error: string | null;
}

class ButtonError extends Component<ButtonErrorProps, ButtonErrorState> {
  state: ButtonErrorState = {
    error: null,
  };

  throwError = () => {
    this.setState({ error: 'Something went wrong.' });
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const { buttonText } = this.props;
    const { error } = this.state;

    return (
      <div>
        <button onClick={this.throwError} style={{ marginTop: '20px' }}>
          {buttonText}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
}

export default ButtonError;
