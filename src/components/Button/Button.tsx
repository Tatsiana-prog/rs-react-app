import React from 'react';

interface ButtonProps {
  btnName: string;
  onClick?: () => void;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return <button onClick={this.props.onClick}>{this.props.btnName}</button>;
  }
}

export default Button;
