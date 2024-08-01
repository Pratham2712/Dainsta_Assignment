import mongoose from "mongoose";
import bookModel from "../Models/bookModel.js";
import reviewModel from "../Models/reviewModel.js";

export const getBookService = async (data) => {
  const keyword = data?.word;
  const query = {
    $or: [
      { title: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
      { author: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
      { description: { $regex: new RegExp(".*" + keyword + ".*", "i") } },
    ],
  };
  if (data.author.length > 0) {
    query.author = { $in: data.author };
  }

  if (data.language.length > 0) {
    query.language = { $in: data.language };
  }
  const total = await bookModel.find(query).count();
  const pagesize = data.pagesize || 4;
  const page = data.page || 0;
  const res = await bookModel
    .find(query, { title: 1, cover: { $slice: 1 } })
    .limit(pagesize)
    .skip(pagesize * Math.abs(page));
  return { total: Math.ceil(total / pagesize), data: res };
};

export const getBookDetailService = async ({ book_id }) => {
  const res = await bookModel.findById(book_id);
  return res;
};
export const commentService = async (data) => {
  const res = await reviewModel.create(data);
  return res;
};
export const checkCommentService = async ({ userId, bookId }) => {
  if (!userId || !bookId) {
    throw new Error("Both userId and bookId are required");
  }
  const res = await reviewModel.find({
    userId: userId,
    bookId: bookId,
  });
  return res;
};

export const editCommentService = async ({
  userId,
  bookId,
  comment,
  rating,
  username,
}) => {
  if (!userId || !bookId || comment === undefined || rating === undefined) {
    throw new Error("userId, bookId, comment, and rating are required");
  }
  const res = await reviewModel.findOneAndUpdate(
    { userId: userId, bookId: bookId },
    { $set: { comment: comment, rating: rating, username: username } },
    { new: true }
  );

  return res;
};

export const getReviewsService = async ({ bookId }) => {
  if (!bookId) {
    throw new Error("Both userId and bookId are required");
  }
  const res = await reviewModel.find({
    bookId: bookId,
  });
  return res;
};

export const addBookService = async (data) => {
  const res = await bookModel.create(data);
  return res;
};
export const editBookService = async (data) => {
  const { _id, ...updateData } = data;

  const result = await bookModel.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: updateData }
  );

  return result;
};

export const delBookService = async (data) => {
  const { _id } = data;
  console.log(_id);
  const result = await bookModel.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return result;
};
