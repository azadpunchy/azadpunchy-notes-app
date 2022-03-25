import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const CreateNote = () => {
  const histoy = useHistory();
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
  });
  // const [err, setErr] = useState("");
  //handling onchange inputs
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
    // setErr("");
  };

  // form handling createNote
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date } = note;
        const newNote = { title, content, date };

        await axios.post("/api/notes", newNote, {
          headers: { Authorization: token },
        });

        return histoy.push("/");
      }
    } catch (error) {
      // err.response.data.msg && setErr(err.response.data.msg);
      window.location.href = "/";
    }
    // console.log(note);
    setNote({
      title: "",
      content: "",
      date: "",
    });
  };
  return (
    <div className="create-note">
      <h2>Create Note</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={note.title}
            id="title"
            onChange={handleInputs}
            required
            placeholder="Your Title"
          />
        </div>
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            rows="10"
            name="content"
            id="content"
            value={note.content}
            onChange={handleInputs}
            required
            placeholder="Your Content"
          />
        </div>
        <label htmlFor="date">Date: {note.date}</label>
        <div className="row">
          <input
            type="date"
            id="date"
            name="date"
            value={note.date}
            onChange={handleInputs}
            placeholder="October 08 2021"
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateNote;
