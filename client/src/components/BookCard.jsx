import {
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookPage } from "../constants/links.js";
import EditBook from "./EditBook.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getBookDetailThunk } from "../redux/slices/bookPageSlice.js";
import { SUCCESS } from "../constants/constants.js";
import DeleteBook from "./DeleteBook.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  //function
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //useSelector
  const content = useSelector(
    (state) => state.rootReducer.bookPageSlice.data.detail
  );
  return (
    <Box>
      <Card
        sx={{
          width: 250,
          height: 275,
          maxHeight: 350,
          padding: "0.5rem 0.5rem",
          borderRadius: "0.3rem",
          margin: "0.2rem",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          position: "relative",
          cursor: "pointer",
          [theme.breakpoints?.down("570")]: {
            width: 150,
            height: 210,
            maxHeight: 350,
            marginBottom: "1rem",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          navigate(bookPage(data?._id));
        }}
      >
        <Box
          component="img"
          sx={{
            maxHeight: "200px",
            width: "100%",
            objectFit: "contain",
            [theme.breakpoints.down("570")]: {
              width: "150px",
              height: "170px",
            },
          }}
          src={data?.cover?.[0]}
          alt="Cover"
        />
        <CardContent
          sx={{
            [theme.breakpoints?.down("570")]: {
              padding: "0",
              paddingLeft: "0.5rem",
            },
          }}
        >
          <Typography
            gutterBottom
            sx={{
              lineHeight: 1.1,
              fontSize: "1rem",
              height: "1rem",
              marginTop: "1.2rem",
              fontWeight: "bold",
              [theme.breakpoints?.down("570")]: {
                fontSize: "0.7rem",
                height: "0.7rem",
                marginTop: "0.5rem",
                fontWeight: "bold",
                padding: "0",
              },
            }}
          >
            {data?.title?.slice(0, 25)}...
          </Typography>
        </CardContent>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0rem 0.5rem",
          paddingTop: "0.3rem",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "50%", marginRight: "0.3rem" }}
          color="error"
          onClick={() => {
            setDel(true);
          }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          sx={{ width: "50%" }}
          color="secondary"
          onClick={() => {
            const info = {
              book_id: data?._id,
            };
            dispatch(getBookDetailThunk(info)).then((e) => {
              if (e.payload.type === SUCCESS) {
                setOpen(true);
              }
            });
          }}
        >
          Edit
        </Button>
      </Box>
      <EditBook
        open={open}
        Transition={Transition}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <DeleteBook
        open={del}
        Transition={Transition}
        handleClickOpen={() => setDel(true)}
        handleClose={() => setDel(false)}
        id={data?._id}
      />
    </Box>
  );
};

export default BookCard;
