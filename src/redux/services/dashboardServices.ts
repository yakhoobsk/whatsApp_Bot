import { createAsyncThunk } from "@reduxjs/toolkit";
import { boomiApi, } from "./commonAxios";



export const ProvidersGet = createAsyncThunk(
    "Providers/get",
    async (_: any, { rejectWithValue }) => {

        try {
            const response = await boomiApi.post("/whatsappbot/get_technicians_availability/serviceproviders");
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
            const response = await boomiApi.post("/whatsappbot/whatsapp_dashboard/whatsapp_dashboard");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch failed"
            );
        }
    }
);


// export const AssistanceGet = createAsyncThunk(
//     "Assistance/get",
//     async ({ payload, paginations }: { payload: any; paginations: any }, { rejectWithValue }) => {

//         try {
//             const response = await boomiApi.post(urlGenarator("/whatsappbot/get_assistance_pagenation/get_assistance_pagenation", paginations), payload);
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(
//                 error.response?.data?.message || "Fetch failed"
//             );
//         }
//     }
// );

export const AssistanceGet = createAsyncThunk(
    "Assistance/get",
    async ({ payload }: { payload: any; }, { rejectWithValue }) => {

        try {
            const response = await boomiApi.post("/whatsappbot/get_assistance_pagenation/get_assistance_pagenation", payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch failed"
            );
        }
    }
);

export const ProviderStatusUpdate = createAsyncThunk(
    "Provider/StatusUpdate",
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await boomiApi.post(
                "/whatsappbot/update_technicians/update_technicians_status",
                payload
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch failed"
            );
        }
    }
);
