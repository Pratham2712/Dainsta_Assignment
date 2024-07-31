import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserInfoSlice from "../slices/UserInfoSlice";
import bookSlice from "../slices/bookSlice";
import bookPageSlice from "../slices/bookPageSlice";

const rootReducer = combineReducers({
  UserInfoSlice: UserInfoSlice,
  bookSlice:bookSlice,
  bookPageSlice:bookPageSlice
  });
  
  export default configureStore({
    reducer: {
      rootReducer: rootReducer,
    },
  });
  