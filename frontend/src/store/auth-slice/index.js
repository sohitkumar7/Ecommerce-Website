import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@api";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await api.post("/api/auth/register", formData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData) => {
    const response = await api.post("/api/auth/login", formData);
    return response.data;
  }
);

export const checkAuth = createAsyncThunk(
  "/auth/check-auth",
  async () => {
    const response = await api.get("/api/auth/check-auth", {
      headers: {
        "Cache-Control": "no-store",
      },
    });
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async () => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.User : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
