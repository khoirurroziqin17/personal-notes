import React from "react";
import NoteBody from "./components/NoteBody";
import NoteHeader from "./components/NoteHeader";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: "",
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(text) {
    this.setState(() => ({
      inputSearch: text,
    }));
  }

  render() {
    return (
      <>
        <NoteHeader handleSearch={this.handleSearch} />
        <NoteBody inputSearch={this.state.inputSearch} />
      </>
    );
  }
}

export default App;
