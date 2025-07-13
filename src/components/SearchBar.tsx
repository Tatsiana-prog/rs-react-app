import React from 'react';

interface SearchBarProps {
  defaultTerm: string;
  onSearch: (term: string) => void;
}

interface SearchBarState {
  input: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      input: props.defaultTerm,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  handleClick = () => {
    const trimmed = this.state.input.trim();
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
