import React from "react";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";
import Swal from "sweetalert2";
import { getInitialData } from "../utils/index";

export class NoteBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getInitialData(),
      editNote: null,
    };

    this.getNote = this.getNote.bind(this);
    this.handleArchivedButton = this.handleArchivedButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleUnarchiveButton = this.handleUnarchiveButton.bind(this);
    this.handleCreateNote = this.handleCreateNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
    this.handleResetNote = this.handleResetNote.bind(this);
  }

  getNote(id) {
    return this.state.notes.filter((note) => note.id == id)[0];
  }
  getNotesNotEqualId(id) {
    return this.state.notes.filter((note) => note.id !== id);
  }

  handleDeleteButton(id) {
    const notesNotChange = this.getNotesNotEqualId(id);
    const noteDeleted = this.getNote(id);

    Swal.fire({
      title: `Yakin mau menghapus catatan "${noteDeleted.title}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, yakin!",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        this.setState(() => ({
          notes: notesNotChange,
        }));

        Swal.fire(
          "Terhapus",
          `Catatan "${noteDeleted.title}" berhasil dihapus.`,
          "success"
        );
      }
    });
  }

  handleEditButton(id) {
    const note = this.getNote(id);

    this.setState(() => ({
      editNote: note,
    }));
  }

  handleArchivedButton(id) {
    const notesNotChange = this.getNotesNotEqualId(id);
    const noteUpdate = { ...this.getNote(id), archived: true };

    this.setState(() => ({
      notes: [...notesNotChange, noteUpdate],
    }));
  }
  handleUnarchiveButton(id) {
    const notesNotChange = this.getNotesNotEqualId(id);
    const noteUpdate = { ...this.getNote(id), archived: false };

    this.setState(() => ({
      notes: [...notesNotChange, noteUpdate],
    }));
  }

  handleResetNote() {
    this.setState((prevState) => ({
      notes: [...prevState.notes],
      editNote: null,
    }));
  }

  handleCreateNote(note) {
    this.setState((prevState) => ({
      notes: [...prevState.notes, note],
    }));
  }

  handleEditNote(note) {
    const notesNotChange = this.getNotesNotEqualId(note.id);

    this.setState(() => ({ notes: [...notesNotChange, note], editNote: null }));
  }

  catatanAktifComponent(note) {
    return (
      <NoteCard
        key={note.id}
        archiveLabel="Arsipkan"
        handleArchivedButton={this.handleArchivedButton}
        handleDeleteButton={this.handleDeleteButton}
        handleEditButton={this.handleEditButton}
        {...note}
      />
    );
  }

  arsipComponent(note) {
    return (
      <NoteCard
        key={note.id}
        archiveLabel="Pindahkan"
        handleDeleteButton={this.handleDeleteButton}
        handleEditButton={this.handleEditButton}
        handleUnarchiveButton={this.handleUnarchiveButton}
        {...note}
      />
    );
  }

  render() {
    const regex = new RegExp(this.props.inputSearch, "i");
    const { notes, editNote } = this.state;
    const { inputSearch } = this.props;

    return (
      <div className="note-app__body">
        <AddNote
          handleCreateNote={this.handleCreateNote}
          handleEditNote={this.handleEditNote}
          handleResetNote={this.handleResetNote}
          editNote={editNote}
        />

        <h2>Catatan Aktif</h2>
        {notes.some((note) => !note.archived) ? (
          <div className="notes-list">
            {inputSearch
              ? notes.map((note) => {
                  if (!note.archived && regex.test(note.title)) {
                    return this.catatanAktifComponent(note);
                  }
                })
              : notes.map(
                  (note) => !note.archived && this.catatanAktifComponent(note)
                )}
          </div>
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan</p>
        )}

        <h2>Arsip</h2>
        {notes.some((note) => note.archived) ? (
          <div className="notes-list">
            {inputSearch
              ? notes.map((note) => {
                  if (note.archived && regex.test(note.title)) {
                    return this.arsipComponent(note);
                  }
                })
              : notes.map((note) => note.archived && this.arsipComponent(note))}
          </div>
        ) : (
          <p className="notes-list__empty-message">Tidak ada catatan</p>
        )}
      </div>
    );
  }
}

export default NoteBody;
