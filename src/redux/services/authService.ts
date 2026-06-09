import { createAsyncThunk } from "@reduxjs/toolkit";
import { boomiApi } from "./commonAxios";
import { showSnackbar } from "../../utils/snackbar";

interface LoginPayload {
    Phone_no: any;
    Otp: any;
}

export const LoginUser = createAsyncThunk(
    "auth/login",
    async (
        payload: LoginPayload,
        { rejectWithValue }
    ) => {
        try {
            const response = await boomiApi.post(
                "/whatapp_bot_login/login_otp",
                payload
            );

            console.log(
                "Login Response:",
                response.data
            );

            if (
                response.data.Response_Status ===
                "Failure"
            ) {
                showSnackbar(
                    "error",
                    response.data.Status_message ||
                    "Login failed"
                );
            } else if (
                response.data.Response_Status ===
                "Success"
            ) {
                showSnackbar(
                    "success",
                    response.data.Status_message ||
                    "OTP Created Successfully"
                );
            }

            return response.data;
        } catch (error: any) {
            showSnackbar(
                "error",
                error?.response?.data?.message ||
                "Login failed"
            );

            return rejectWithValue(
                error?.response?.data?.message ||
                "Login failed"
            );
        }
    }
);


export const OTPValidation = createAsyncThunk(
    "OTPValidation/user",
    async (
        payload: LoginPayload,
        { rejectWithValue }
    ) => {
        try {
            const response = await boomiApi.post(
                "/whatapp_bot_login_validation/login_validation",
                payload
            );

            const data = response.data;

            if (
                data?.Responce_Status?.toLowerCase() ===
                "failure"
            ) {
                showSnackbar(
                    "error",
                    data?.["Status message"] ||
                    "OTP validation failed"
                );
            } else if (
                data?.Responce_Status?.toLowerCase() ===
                "succcess"
            ) {
                showSnackbar(
                    "success",
                    data?.["Status message"] ||
                    "OTP validation successful"
                );
            }

            return data;
        } catch (error: any) {
            showSnackbar(
                "error",
                error?.response?.data?.message ||
                "OTP validation failed"
            );

            return rejectWithValue(
                error?.response?.data?.message ||
                "OTP validation failed"
            );
        }
    }
);


export const LogoutUser = createAsyncThunk(
    "auth/logout",
    async (_: any, { rejectWithValue }
    ) => {
        try {
            const response = await boomiApi.post("/whatapp_Bot_logout/logout",);
            if (response.data.Response_Status === "Failure") {
                showSnackbar("error", response.data.Status_message || "Logout failed");
            } else if (response.data.Response_Status === "Success") {
                showSnackbar("success", response.data.Status_message || "Logout successful");
            }
            return response.data;
        } catch (error: any) {
            showSnackbar(
                "error",
                error?.response?.data?.message ||
                "Logout failed"
            );

            return rejectWithValue(
                error?.response?.data?.message ||
                "Logout failed"
            );
        }
    }
);
