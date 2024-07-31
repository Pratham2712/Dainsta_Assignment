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
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addBookThunk } from "../redux/slices/bookSlice";
import { SUCCESS } from "../constants/constants";

const AddBook = ({ open: start, Transition, handleClose }) => {
  const [successMsg, setSuccessMsg] = useState({ type: false, msg: "" });
  const dispatch = useDispatch();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  //schema
  const schema = yup.object().shape({
    cover: yup.string().required("Cover URL is required"),
    title: yup.string().required("Title is required"),
    author: yup.string().required("Author is required"),
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
      cover: "",
      title: "",
      author: "",
      language: "",
      description: "",
      publishedDate: null,
    },
  });
  //function
  const onSubmit = (data) => {
    console.log(data);
    dispatch(addBookThunk(data)).then((data) => {
      if (data.payload.type === SUCCESS) {
        setSuccessMsg((prevSuccessMsg) => ({
          ...prevSuccessMsg,
          type: true,
          msg: "Book added successfully",
        }));
        handleClose();
      }
    });
  };
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
        <DialogTitle>Add Book</DialogTitle>
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
                    console.log(e.$d);
                  }}
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddBook;
