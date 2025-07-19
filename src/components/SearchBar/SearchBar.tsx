import React from 'react';
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import Search from '../Search/Search';

interface SearchBarProps {
  defaultTerm: string;
  onSearch: (term: string) => void;
}

interface SearchBarState {
  input: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    input: this.props.defaultTerm,
  };

  handleInputChange = (value: string) => {
    this.setState({ input: value });
  };

  handleSearchClick = () => {
    this.props.onSearch(this.state.input);
  };

  render() {
    return (
      <div
        style={{
          margin: '10px auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Search
          value={this.state.input} // Передаем текущее значение input
          onChange={this.handleInputChange}
        />
        <ButtonSearch btnName="Search" onClick={this.handleSearchClick} />
      </div>
    );
  }
}

export default SearchBar;
