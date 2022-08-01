import React from "react";
import { showFormattedDate } from "../utils/index";

export class NoteCard extends React.Component {
  render() {
    const {
      id,
      title,
      createdAt,
      body,
      archived,
      archiveLabel,
      handleArchivedButton,
      handleDeleteButton,
      handleEditButton,
      handleUnarchiveButton,
    } = this.props;
    const date = showFormattedDate(createdAt);

    return (
      <div className="note-item">
        <div className="note-item__content">
          <h3 className="note-item__title">{title}</h3>
          <p className="note-item__date">{date}</p>
          <p className="note-item__body">{body}</p>
        </div>
        <div className="note-item__action">
          <button
            className="note-item__delete-button"
            onClick={() => handleDeleteButton(id)}
          >
            Hapus
          </button>
          <button
            className="note-item__edit-button"
            onClick={() => handleEditButton(id)}
          >
            Edit
          </button>
          <button
            className="note-item__archive-button"
            onClick={() =>
              archived ? handleUnarchiveButton(id) : handleArchivedButton(id)
            }
          >
            {archiveLabel}
          </button>
        </div>
      </div>
    );
  }
}

export default NoteCard;
