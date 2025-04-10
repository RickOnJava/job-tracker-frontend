import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  loading: false,
  error: null
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
      state.error = null;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const updated = action.payload;
      state.jobs = state.jobs.map((job) =>
        job._id === updated._id ? updated : job
      );
    },
    deleteJob: (state, action) => {
      const id = action.payload;
      state.jobs = state.jobs.filter((job) => job._id !== id);
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  setLoading,
  setError
} = jobSlice.actions;

export default jobSlice.reducer;
