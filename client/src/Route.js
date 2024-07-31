import React from "react";
import { Route, Routes } from "react-router-dom";
import { bookPage, USER_Root } from "./constants/links";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";

const Routess = () => {
    return (
      <Routes>
        <Route path={USER_Root} element={<Home/>}></Route>
        <Route path={bookPage(":id")} element={<BookPage />}></Route>
      </Routes>
    );
  };
  
  export default Routess;