import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { format } from "timeago.js";
import axios from "axios";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState("");

  const getNotes = async (token) => {
    const res = await axios.get("api/notes/", {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  const extractAll = (a) => {
    var buff,
      date,
      // monthNames,
      day,
      month,
      year,
      plusMinus,
      output;
    if (a.length) {
      //By the power of Regular Expression-----------
      if (
        /^\d+-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([-+]\d{2}:\d{2})|Z)$/.test(
          a
        )
      ) {
        buff = a.split("T");

        date = buff[0].split("-");
        day = date[2];
        month = date[1];
        year = date[0];

        buff = buff[1];
        buff = buff.split(":");

        buff = buff.join(":");
        if (/\+/.test(buff)) {
          plusMinus = "+";
        } else if (/-/.test(buff)) {
          plusMinus = "-";
        } else if (/Z/.test(buff)) {
          plusMinus = "Z";
        }
        buff = buff.split(plusMinus);
        // second = second.split(plusMinus)[0];

        // monthNames =
        //   "January,February,March,April,May,June,July,August,September,October,November,December";
        // monthNames = monthNames.split(",");
        // console.log(month, "I am month");
        output =
          // ---------------------------------------------------This will convert mont value to name
          // monthNames[Number(month) - 1] +
          month + "/" + day + "/" + year;
      } else {
        output = "<code style='color:red'>invalid input</code>";
      }
    } else {
      output = "<span class='faded'>Result</span>";
    }
    return output;
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenStore");
    setToken(token);
    if (token) {
      getNotes(token);
    }
  }, []);

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = "/";
    }
  };
  return (
    <div className="note-wrapper">
      {notes.map((note) => (
        <div className="card" key={note._id}>
          <h4 title={note.title}>{note.title}</h4>
          <div className="text-wrapper">
            <p>{note.content}</p>
          </div>
          <p className="date">
            {/* {format(note.date)} <br /> */}
            {/* {Date(note.date).toDateString()} */}
            {extractAll(note.date)}
          </p>
          {/* start work from here*/}
          <div className="card-footer">
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
          </div>
          <button
            className="close"
            onClick={() => {
              if (window.confirm("Do you really want to delete") === true)
                deleteNote(note._id);
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
