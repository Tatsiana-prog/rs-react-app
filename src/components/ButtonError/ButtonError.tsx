import React from 'react';

interface ButtonErrorState {
  throwError: boolean;
}

export class ButtonError extends React.Component<unknown, ButtonErrorState> {
  constructor(props: unknown) {
    super(props);
    this.state = { throwError: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ throwError: true });
  }

  render() {
    if (this.state.throwError) {
      throw new Error('Искусственная ошибка при клике на кнопку');
    }

    return (
      <button
        onClick={this.handleClick}
        style={{
          textAlign: 'center',
          margin: '25px auto',
        }}
      >
        Button Error
      </button>
    );
  }
}

export default ButtonError;
