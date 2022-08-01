import React from "react";
import Swal from "sweetalert2";

export class AddNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      title: "",
      note: "",
      titleChar: 0,
      clearButton: false,
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleResetInputNote = this.handleResetInputNote.bind(this);
    this.handleSubmitCreateNote = this.handleSubmitCreateNote.bind(this);
    this.handleSubmitEditNote = this.handleSubmitEditNote.bind(this);
  }

  handleTitleChange(event) {
    this.setState(() => {
      const eventLen = event.target.value.split("").length;

      if (eventLen <= 50) {
        return {
          title: event.target.value,
          titleChar: eventLen,
        };
      }
    });
  }
  handleNoteChange(event) {
    this.setState(() => ({
      note: event.target.value,
    }));
  }

  handleResetInputNote(event) {
    event.preventDefault();

    this.props.handleResetNote();
    this.setState(() => ({
      id: "",
      title: "",
      note: "",
      titleChar: 0,
      clearButton: false,
    }));
  }

  handleSubmitCreateNote(event) {
    event.preventDefault();

    const note = {
      id: +new Date(),
      title: this.state.title,
      body: this.state.note,
      createdAt: String(new Date()),
      archived: false,
    };

    Swal.fire({
      icon: "success",
      title: `Catatan "${note.title}" berhasil ditambahkan.`,
      showConfirmButton: false,
      timer: 2500,
    }).then(() => {
      this.props.handleCreateNote(note);
      this.setState({ title: "", note: "" });
    });
  }

  handleSubmitEditNote(event) {
    event.preventDefault();
    const { id, createdAt, archived } = this.props.editNote;

    const note = {
      id: id,
      title: this.state.title,
      body: this.state.note,
      createdAt: createdAt,
      archived: archived,
    };

    Swal.fire({
      title: `Simpan perubahan catatan "${note.title}"`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, yakin!",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.handleEditNote(note);
        this.setState(() => ({
          id: "",
          title: "",
          note: "",
          titleChar: 0,
          clearButton: false,
        }));

        Swal.fire(
          "Berhasil",
          `Catatan "${note.title}" berhasil diubah.`,
          "success"
        );
      }
    });
  }

  componentDidUpdate() {
    const { editNote } = this.props;

    if (this.state.id !== editNote?.id && editNote) {
      this.setState(() => ({
        id: editNote.id,
        title: editNote.title,
        note: editNote.body,
        titleChar: editNote.title.split("").length,
        clearButton: true,
      }));
    }
  }

  render() {
    return (
      <div className="note-input">
        <h2>Buat Catatan</h2>
        <form
          onSubmit={
            this.state.clearButton
              ? this.handleSubmitEditNote
              : this.handleSubmitCreateNote
          }
          onReset={this.handleResetInputNote}
        >
          <span className="note-input__title__char-limit">
            {this.state.titleChar}/50
          </span>
          <input
            type="text"
            className="note-input__title"
            placeholder="Judul catatan ..."
            value={this.state.title}
            onChange={this.handleTitleChange}
            required
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu disini ..."
            value={this.state.note}
            onChange={this.handleNoteChange}
            required
          ></textarea>
          <div className="note-input__button">
            {this.state.clearButton && (
              <button type="reset" className="button-cancel">
                Batal
              </button>
            )}
            <button type="submit">
              {this.state.clearButton ? "Ubah" : "Buat"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
