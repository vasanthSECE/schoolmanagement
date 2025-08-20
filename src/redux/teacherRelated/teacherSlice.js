import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    teachersList: [],
    teacherDetails: [],
    loading: false,
    error: null,
    response: null,
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        doneSuccess: (state, action) => {
            state.teacherDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getSuccess: (state, action) => {
            state.teachersList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;

            const error = action.payload;

            // Safely extract AxiosError details
            if (error?.isAxiosError) {
                state.error = {
                    message: error.message,
                    code: error.code,
                    status: error.response?.status,
                    data: error.response?.data,
                };
            } else {
                state.error = {
                    message: error?.toString() || "Unknown error occurred",
                };
            }
        },
        postDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    doneSuccess,
    postDone
} = teacherSlice.actions;

export const teacherReducer = teacherSlice.reducer;
