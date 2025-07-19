import React from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

class Search extends React.Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
        type="search"
        value={this.props.value}
        onChange={this.handleChange}
        placeholder="Search by name"
      />
    );
  }
}

export default Search;
