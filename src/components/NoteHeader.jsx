import React from "react";
import SearchInput from "./SearchInput";

function NoteHeader({ handleSearch }) {
  return (
    <div className="note-app__header">
      <h1>MyNotes</h1>
      <SearchInput handleSearch={handleSearch} />
    </div>
  );
}

export default NoteHeader;
