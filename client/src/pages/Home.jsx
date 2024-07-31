import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Books from "../components/Books";
import { Box, createTheme, Slide } from "@mui/material";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import AddBook from "../components/AddBook";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
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

  return (
    <>
      <Box>
        <Navbar />
        <Box
          sx={{
            paddingTop: "6rem",
            marginLeft: "7rem",
            [theme.breakpoints?.down("780")]: {
              marginLeft: "2rem",
            },
          }}
        >
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            sx={{
              color: "#000814",
              border: "2px solid #000814",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#000814",
                color: "#ffffff",
                border: "2px solid #000814",
              },
            }}
          >
            Add Book
          </Button>

          <AddBook
            open={open}
            Transition={Transition}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
          />
        </Box>
        <Books />
      </Box>
    </>
  );
};

export default Home;
