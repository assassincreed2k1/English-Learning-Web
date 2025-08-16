import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy profile từ backend
export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);

    if (!token) return rejectWithValue("No token");
    try {
      const res = await axios.get("http://localhost:8080/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.result;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Lỗi kết nối server"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      console.log("PROFILE DATA:", action.payload);
    },
    logout: (state) => {
      state.profile = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        console.log("✅ fetchProfile SUCCESS:", action.payload);

        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.profile = null;
      });
  },
});

export const { setProfile, logout } = userSlice.actions;
export default userSlice.reducer;
