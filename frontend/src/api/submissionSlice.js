import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Lấy danh sách bài nộp theo examId
export const fetchSubmissionsByExam = createAsyncThunk(
  "submission/fetchSubmissionsByExam",
  async (examId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8080/api/exams/${examId}/submissions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi tải danh sách bài nộp");
    }
  }
);

// Lấy chi tiết 1 bài nộp theo submissionId
export const fetchSubmissionDetail = createAsyncThunk(
  "submission/fetchSubmissionDetail",
  async (submissionId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:8080/api/submissions/${submissionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi tải chi tiết bài nộp");
    }
  }
);

// Nộp bài thi
export const submitExam = createAsyncThunk(
  "submission/submitExam",
  async ({ examId, answers }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:8080/api/exams/${examId}/submissions`,
        answers,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Lỗi nộp bài thi");
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",
  initialState: {
    submissions: [],
    submissionDetail: null,
    loading: false,
    error: null,
    submitResult: null,
  },
  reducers: {
    clearSubmitResult: (state) => {
      state.submitResult = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSubmissionsByExam
      .addCase(fetchSubmissionsByExam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissionsByExam.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
      })
      .addCase(fetchSubmissionsByExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchSubmissionDetail
      .addCase(fetchSubmissionDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissionDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.submissionDetail = action.payload;
      })
      .addCase(fetchSubmissionDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // submitExam
      .addCase(submitExam.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitResult = null;
      })
      .addCase(submitExam.fulfilled, (state, action) => {
        state.loading = false;
        state.submitResult = action.payload;
      })
      .addCase(submitExam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.submitResult = null;
      });
  },
});

export const { clearSubmitResult } = submissionSlice.actions;
export default submissionSlice.reducer;