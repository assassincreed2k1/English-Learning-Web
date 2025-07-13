import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Hàm lấy token từ localStorage
const getToken = () => localStorage.getItem("token");

// Hàm tạo headers có token
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// Lấy danh sách tất cả đề thi
export const fetchExams = createAsyncThunk(
  "exam/fetchExams",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:8080/api/exams", {
        headers: getAuthHeaders(),
      });
      return res.data.result || res.data; // tuỳ backend trả về
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi tải danh sách đề thi");
    }
  }
);

// Lấy chi tiết 1 đề thi theo id
export const fetchExamById = createAsyncThunk(
  "exam/fetchExamById",
  async (examId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/exams/${examId}`, {
        headers: getAuthHeaders(),
      });
      return res.data.result || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi tải chi tiết đề thi");
    }
  }
);

// Tạo mới đề thi
export const createExam = createAsyncThunk(
  "exam/createExam",
  async (examData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/exams",
        examData,
        { headers: getAuthHeaders() }
      );
      return res.data.result || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi tạo đề thi");
    }
  }
);

const examSlice = createSlice({
  name: "exam",
  initialState: {
    exams: [],
    examDetail: null,
    loading: false,
    error: null,
    createSuccess: false,
  },
  reducers: {
    clearExamDetail: (state) => {
      state.examDetail = null;
    },
    clearCreateSuccess: (state) => {
      state.createSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchExams
      .addCase(fetchExams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExams.fulfilled, (state, action) => {
        state.loading = false;
        state.exams = action.payload;
      })
      .addCase(fetchExams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchExamById
      .addCase(fetchExamById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamById.fulfilled, (state, action) => {
        state.loading = false;
        state.examDetail = action.payload;
      })
      .addCase(fetchExamById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createExam
      .addCase(createExam.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.createSuccess = false;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading = false;
        state.createSuccess = true;
        // Optionally push new exam to exams array
        // state.exams.push(action.payload);
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.createSuccess = false;
      });
  },
});

export const { clearExamDetail, clearCreateSuccess } = examSlice.actions;
export default examSlice.reducer;