import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BASE_URL,
  ERROR,
  FULFILLED,
  IDLE,
  SUCCESS,
} from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getBooksThunk = createAsyncThunk("/book/getBook", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/book/getBook`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const addBookThunk = createAsyncThunk("/book/addBook", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/book/addBook`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const editBookThunk = createAsyncThunk(
  "/book/editBook",
  async (data) => {
    try {
      const res = await axios.put(`${BASE_URL}/book/editBook`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteBookThunk = createAsyncThunk(
  "/book/deleteBook",
  async (data) => {
    try {
      const res = await axios.delete(`${BASE_URL}/book/deleteBook/${data._id}`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const initialState = {
  loading: false,
  updateDone: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  successData: {
    message: "",
  },
  isError: false,
  data: {
    book: [],
    total: 0,
  },
  status: {
    getBooksThunk: IDLE,
    addBookThunk: IDLE,
    editBookThunk: IDLE,
    deleteBookThunk: IDLE,
  },
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getBooksThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getBooksThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.data.book = payload.data;
            state.data.total = payload.total;
            state.loading = false;
            state.status.getBooksThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(getBooksThunk.rejected, (state, action) => {
        state.status.getBooksThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //addBookThunk=================================================================================================================
      .addCase(addBookThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addBookThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.status.addBookThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(addBookThunk.rejected, (state, action) => {
        state.status.addBookThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //editBookThunk=================================================================================================================
      .addCase(editBookThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(editBookThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.status.editBookThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(editBookThunk.rejected, (state, action) => {
        state.status.editBookThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //deleteBookThunk=================================================================================================================
      .addCase(deleteBookThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteBookThunk.fulfilled, (state, { payload }) => {
        switch (payload.type) {
          case SUCCESS:
            state.loading = false;
            state.status.deleteBookThunk = FULFILLED;
            break;
          default:
            state.loading = false;
            state.errorData = {
              message: payload.message,
              type: payload.type,
              errors: payload.errors,
            };
            break;
        }
      })
      .addCase(deleteBookThunk.rejected, (state, action) => {
        state.status.deleteBookThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default bookSlice.reducer;
export const { clearErrorSlice } = bookSlice.actions;
