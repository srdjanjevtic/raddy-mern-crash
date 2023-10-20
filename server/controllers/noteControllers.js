import Note from "../models/Note.js";

// @desc    Create a new note
// @route   POST  /api/notes
// @access  Public
export const createNote = async (req, res) => {
  try {
    const { title, description, category, _id } = req.body;
    const existingNote = await Note.findById(_id);
    if (existingNote) {
      res.status(400);
      throw new Error("Error creating note");
    }
    const newNote = await Note.create({
      title,
      description,
      category,
    });
    return res.status(201).json({ newNote });
  } catch (error) {
    console.log(error);
  }
};

// @desc    Update the note
// @route   PUT  /api/notes/:id
// @access  Public
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description, category } = req.body;
    const data = await Note.findByIdAndUpdate(noteId, {
      title,
      description,
      category,
    });
    if (!data) {
      throw new Error("An error occurred");
    }
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

// @desc    Get all notes
// @route   GET  /api/notes
// @access  Public
export const getAllNotes = async (req, res) => {
  const filter = {};
  const category = req.query.category;
  if (category) filter.category = category;
  const data = await Note.find(filter);
  if (data.length === 0) {
    throw new Error("There is no notes in DB");
  }
  return res.status(200).json(data);
};

// @desc    Get the note
// @route   GET  /api/notes/:id
// @access  Public
export const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Note.findById(noteId);
    if (!data) {
      throw new Error({ message: "There is no note with provided id" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// @desc    Delete note
// @route   DELETE  /api/notes/:id
// @access  Public
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Note.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error({ message: "There is no note with provided id" });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
