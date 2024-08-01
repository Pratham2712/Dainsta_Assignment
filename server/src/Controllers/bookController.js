import { FAILURE, SUCCESS } from "../constants/constants.js";
import {
  addBookService,
  checkCommentService,
  commentService,
  delBookService,
  editBookService,
  editCommentService,
  getBookDetailService,
  getBookService,
  getReviewsService,
} from "../service/bookService.js";

export const getBookController = async (req, res, next) => {
  try {
    const data = req.body;
    const filter = {
      page: data.page || 0,
      pagesize: data.pagesize || 4,
      word: data.word || "",
      author: Array.isArray(data.author) ? data.author : [],
      language: Array.isArray(data.language) ? data.language : [],
    };

    const result = await getBookService(filter);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetch successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getBookDetailController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getBookDetailService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Fetched successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const commentController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await commentService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Post successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to post",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const checkCommentController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await checkCommentService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Comment found successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "No comment ",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const editCommentController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await editCommentService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Comment edited successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to comment",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getReviewsController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await getReviewsService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Reviews fetch successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to fetch",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const addBookController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await addBookService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Book added successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to add",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
export const editBookController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await editBookService(data);
    if (result) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Book edited successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to edit",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};

export const delBookController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await delBookService({ _id: id });
    if (result.deletedCount !== 0) {
      return res.status(200).json({
        type: SUCCESS,
        message: "Book delete successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        type: FAILURE,
        message: "Failed to delete",
        errors: [],
      });
    }
  } catch (error) {
    next(error);
  }
};
