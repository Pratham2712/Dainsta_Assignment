import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  rating: {
    type: Number,
  },
  userId: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  bookId: {
    type: [mongoose.Types.ObjectId],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const reviewModel = mongoose.model("review", reviewSchema);
export default reviewModel;
