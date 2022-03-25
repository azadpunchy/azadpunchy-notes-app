const Notes = require("../models/noteModel");

const noteCtrl = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      if (!title || !content || !date)
        return res.status(400).json({ msg: "plz fill all fields properly" });

      const newNote = new Notes({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      // res.json(newNote);
      await newNote.save();
      res.json({ msg: "Created Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Note" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
          date,
        }
      );
      res.json({ msg: "updated a Note" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = noteCtrl;
