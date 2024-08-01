import { Router } from "express";
import {
  addBookController,
  checkCommentController,
  commentController,
  delBookController,
  editBookController,
  editCommentController,
  getBookController,
  getBookDetailController,
  getReviewsController,
} from "../Controllers/bookController.js";
import { verifyToken } from "../middlewares/jwtMiddlewares.js";

export const bookRouter = Router();

bookRouter.post("/getBook", getBookController);
bookRouter.post("/addBook", addBookController);
bookRouter.put("/editBook", editBookController);
bookRouter.delete("/deleteBook/:id", delBookController);
bookRouter.post("/getBookDetail", getBookDetailController);
bookRouter.post("/comment", verifyToken, commentController);
bookRouter.post("/checkComment", verifyToken, checkCommentController);
bookRouter.post("/editComment", verifyToken, editCommentController);
bookRouter.post("/getReviews", getReviewsController);
