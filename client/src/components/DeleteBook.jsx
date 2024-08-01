import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteBookThunk, getBooksThunk } from "../redux/slices/bookSlice";
import { SUCCESS } from "../constants/constants";
import { useSearchParams } from "react-router-dom";

const DeleteBook = ({ open: start, Transition, handleClose, id }) => {
  const dispatch = useDispatch();
  const [successMsg, setSuccessMsg] = useState({ type: false, msg: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  //function
  const handleDelete = () => {
    dispatch(deleteBookThunk({ _id: id })).then((data) => {
      if (data.payload.type === SUCCESS) {
        setSuccessMsg((prevSuccessMsg) => ({
          ...prevSuccessMsg,
          type: true,
          msg: "Book deleted successfully",
        }));
        handleClose();
        const info = {
          page: searchParams.get("page") - 1 || 0,
          pagesize: searchParams.get("pagesize") || 8,
        };
        dispatch(getBooksThunk(info));
      }
    });
  };
  return (
    <>
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
          <DialogTitle>Delete Book</DialogTitle>
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

          <DialogContent sx={{ padding: "1rem 0.5rem", margin: "1rem 3rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: "50%", marginRight: "2rem" }}
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                variant="contained"
                sx={{ width: "50%" }}
                onClick={handleDelete}
              >
                Yes
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default DeleteBook;
