import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
const EditNote = ({ match }) => {
  const histoy = useHistory();
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });
  // const [err, setErr] = useState("");
  //handling onchange inputs
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
    // setErr("");
  };

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (match.params.id) {
        const res = await axios.get(`/api/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  // form handling createNote
  const editNote = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = { title, content, date };

        await axios.put(`/api/notes/${id}`, newNote, {
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
      <h2>Edit Note</h2>
      <form onSubmit={editNote} autoComplete="off">
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

export default EditNote;
