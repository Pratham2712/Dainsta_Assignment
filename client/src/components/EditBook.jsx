import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SUCCESS } from "../constants/constants";
import dayjs from "dayjs";
import { editBookThunk } from "../redux/slices/bookSlice";

const EditBook = ({ open: start, Transition, handleClose }) => {
  const [successMsg, setSuccessMsg] = useState({ type: false, msg: "" });
  const dispatch = useDispatch();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  //useSelector
  const content = useSelector(
    (state) => state.rootReducer.bookPageSlice?.data?.detail
  );

  const [fill, setFill] = useState({
    title: content?.title || "",
    cover: content?.cover?.[0] || "",
    description: content?.cover || "",
    author: content?.author?.[0] || "",
    publishedDate: content?.publishedDate || null,
    language: content?.language || "",
  });
  //schema
  const schema = yup.object().shape({
    cover: yup.string().required("Cover URL is required"),
    title: yup.string().required("Title is required"),
    author: yup
      .array()
      .of(yup.string().required("Author name is required"))
      .min(1, "At least one author is required"),
    language: yup.string().required("Language is required"),
    description: yup.string().required("Description is required"),
    publishedDate: yup.date().required("Published Date is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cover: content?.cover?.[0],
      title: content?.title,
      author: content?.author?.[0],
      language: content?.language,
      description: content?.description,
      publishedDate: content?.publishedDate,
    },
  });
  //function
  const onSubmit = (data) => {
    const info = { ...data, _id: content?._id };
    dispatch(editBookThunk(info)).then((data) => {
      if (data.payload.type === SUCCESS) {
        setSuccessMsg((prevSuccessMsg) => ({
          ...prevSuccessMsg,
          type: true,
          msg: "Book edited successfully",
        }));
        handleClose();
      }
    });
  };
  useEffect(() => {
    setValue("title", content?.title);
    setValue("cover", content?.cover?.[0]);
    setValue("author", content?.author);
    setValue("description", content?.description);
    setValue("language", content?.language);
    setValue("publishedDate", dayjs(content?.publishedDate));
    setFill((prev) => ({
      ...prev,
      title: content?.title,
      cover: content?.cover?.[0],
      description: content?.description,
      author: content?.author,
      language: content?.language,
      publishedDate: dayjs(content?.publishedDate),
    }));
  }, [content]);
  return (
    <Box>
      <Snackbar
        open={successMsg.type}
        anchorOrigin={{ vertical, horizontal }}
        autoHideDuration={2000}
        onClose={() => {
          setSuccessMsg((prevSuccessMsg) => ({
            ...prevSuccessMsg,
            type: false,
            msg: "",
          }));
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => {
            setSuccessMsg((prevSuccessMsg) => ({
              ...prevSuccessMsg,
              type: false,
              msg: "",
            }));
          }}
          sx={{ width: "100%" }}
        >
          {successMsg.msg}
        </Alert>
      </Snackbar>
      <Dialog
        open={start}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Edit Book</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <TextField
            autoFocus
            required
            id="filled-basic"
            label="Cover URL"
            variant="filled"
            sx={{ width: "100%", marginBottom: "1rem" }}
            {...register("cover")}
            error={!!errors.coverUrl}
            helperText={errors.coverUrl?.message}
            value={fill.cover}
          />

          <TextField
            required
            id="filled-basic"
            label="Title"
            variant="filled"
            sx={{ width: "100%", marginBottom: "1rem" }}
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            value={fill.title}
          />
          <TextField
            required
            id="filled-basic"
            label="Author"
            variant="filled"
            sx={{ width: "100%", marginBottom: "1rem" }}
            {...register("author")}
            error={!!errors.author}
            helperText={errors.author?.message}
            value={fill.author}
          />
          <TextField
            required
            id="filled-basic"
            label="Language"
            variant="filled"
            sx={{ width: "100%", marginBottom: "1rem" }}
            {...register("language")}
            error={!!errors.language}
            helperText={errors.language?.message}
            value={fill.language}
          />
          <TextField
            required
            id="filled-multiline-flexible"
            label="Description"
            multiline
            rows={2}
            variant="filled"
            sx={{ width: "100%", marginBottom: "1rem" }}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            value={fill.description}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="publishedDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Published Date"
                  onChange={(e) => {
                    setValue("publishedDate", e.$d);
                  }}
                  value={dayjs(fill.publishedDate)}
                  renderInput={(params) => (
                    <TextField
                      required
                      fullWidth
                      margin="dense"
                      error={!!errors.publishedDate}
                      helperText={errors.publishedDate?.message}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditBook;
