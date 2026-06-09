import { createSlice } from "@reduxjs/toolkit";
import { AssistanceGet, DashboardGet, ProvidersGet } from "../services/dashboardServices";

interface ProviderState {
    loading: boolean;
    providers: any;
    error: string | null;
    dashboard: any;
    assistance: any;
}

const initialState: ProviderState = {
    loading: false,
    providers: null,
    error: null,
    dashboard: null,
    assistance: null
};


const ProvidersSlice = createSlice({
    name: "Providers",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(ProvidersGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(ProvidersGet.fulfilled, (state, action) => {
                state.loading = false;
                state.providers = action.payload;
            })

            .addCase(ProvidersGet.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(DashboardGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(DashboardGet.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload;
            })

            .addCase(DashboardGet.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(AssistanceGet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(AssistanceGet.fulfilled, (state, action) => {
                state.loading = false;
                state.assistance = action.payload;
            })

            .addCase(AssistanceGet.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default ProvidersSlice;