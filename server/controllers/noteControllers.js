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
