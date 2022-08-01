import React from "react";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(() => ({
      input: event.target.value,
    }));
    this.props.handleSearch(event.target.value);
  }

  render() {
    return (
      <div className="note-search">
        <input
          type="text"
          placeholder="Cari Catatan ..."
          value={this.state.input}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchInput;
