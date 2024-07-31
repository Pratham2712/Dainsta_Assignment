import { Box, Grid, LinearProgress, Pagination, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksThunk } from "../redux/slices/bookSlice";
import BookCard from "./BookCard";
import { createSearchParams, useSearchParams } from "react-router-dom";

const Books = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  //use effect
  useEffect(() => {
    pageParams(
      searchParams.get("page") || 1,
      searchParams.get("pagesize") || 8
    );
    const data = {
      page: searchParams.get("page") - 1 || 0,
      pagesize: searchParams.get("pagesize") || 8,
      word: searchParams.get("query") || "",
    };
    dispatch(getBooksThunk(data));
  }, [searchParams.get("page"), searchParams.get("pagesize")]);
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["page"] = 1;
    params["pagesize"] = 8;
    setSearchParams(createSearchParams(params));
  }, []);
  //useSelector
  const books = useSelector(
    (state) => state.rootReducer.bookSlice.data.book.data
  );
  const loading = useSelector((state) => state.rootReducer.bookSlice.loading);
  const total = useSelector(
    (state) => state.rootReducer.bookSlice.data.book.total
  );
  //function
  const pageParams = (page, pageSize) => {
    const params = Object.fromEntries(searchParams);
    params["page"] = page;
    params["pagesize"] = pageSize;
    setSearchParams(createSearchParams(params));
  };

  return (
    <Box sx={{ paddingTop: "2rem" }}>
      {loading ? (
        <Box sx={{ width: "100%", height: "100vh", position: "absolute" }}>
          <LinearProgress
            color="inherit"
            sx={{ top: "30%", zIndex: "100", width: "30%", left: "35%" }}
          />
        </Box>
      ) : (
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          sx={{ justifyContent: "center" }}
        >
          {books?.map((data, index) => {
            return (
              <Grid item key={index}>
                <BookCard data={data} />
              </Grid>
            );
          })}
        </Grid>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={total}
            onChange={(e, value) => {
              pageParams(parseInt(value), 8);
            }}
            color="secondary"
            page={parseInt(searchParams.get("page"))}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default Books;
