import { createSlice } from "@reduxjs/toolkit";
import { removeSecureItem } from "../../utils/webSecureStorage";
import { OTPValidation } from "../services/authService";

interface AuthState {
    loading: boolean;
    auth: any;
    error: string | null;
}

const initialState: AuthState = {
    loading: false,
    auth: null,
    error: null
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuth(state: any) {
            state.auth = null;
            state.isLoading = false;
            removeSecureItem('accessToken');
            removeSecureItem('refreshTocken');
        }
    },

    extraReducers: (builder) => {
        builder

            .addCase(OTPValidation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(OTPValidation.fulfilled, (state, action) => {
                state.loading = false;
                state.auth = action.payload;
            })

            .addCase(OTPValidation.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;
export const { clearAuth } = authSlice.actions;