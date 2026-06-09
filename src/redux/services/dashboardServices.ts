import { createAsyncThunk } from "@reduxjs/toolkit";
import { boomiApi, urlGenarator } from "./commonAxios";



export const ProvidersGet = createAsyncThunk(
    "Providers/get",
    async (_: any, { rejectWithValue }) => {

        try {
            const response = await boomiApi.post("/whatsapp_bot/get_service_providers");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch failed"
            );
        }
    }
);


export const DashboardGet = createAsyncThunk(
    "Dashboard/get",
    async (_: any, { rejectWithValue }) => {

        try {
            const response = await boomiApi.get("/whatapp_Bot_Dashboard/whatapp_Dashboard");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch failed"
            );
        }
    }
);


export const AssistanceGet = createAsyncThunk(
    "Assistance/get",
    async ({ payload, paginations }: { payload: any; paginations: any }, { rejectWithValue }) => {

        try {
            const response = await boomiApi.post(urlGenarator("/whatapp_bot_Assistance_Get/Assistance_Get", paginations), payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch failed"
            );
        }
    }
);
