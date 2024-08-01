import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  cover: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const bookModel = mongoose.model("book", bookSchema);
export default bookModel;
