import type { ThemeConfig } from "antd";

export const lightTheme: ThemeConfig = {
    token: {
        // WhatsApp Brand Colors
        colorPrimary: "#25D366",
        colorLink: "#25D366",
        colorLinkHover: "#1EBE5D",

        colorSuccess: "#25D366",
        colorWarning: "#F59E0B",
        colorError: "#EF4444",
        colorInfo: "#06B6D4",

        // Text
        colorText: "#1E293B",
        colorTextSecondary: "#64748B",
        colorTextDisabled: "#CBD5E1",

        // Backgrounds
        colorBgBase: "#FFFFFF",
        colorBgLayout: "#F8FAFC",

        // Borders
        colorBorder: "#E2E8F0",

        // Global
        borderRadius: 14,
        fontSize: 14,
        fontFamily: "'DM Sans', sans-serif",
    },

    components: {
        Button: {
            borderRadius: 14,
            fontWeight: 600,
            controlHeight: 42,
            colorPrimary: "#25D366",
            colorPrimaryHover: "#1EBE5D",
            primaryShadow:
                "0 10px 20px rgba(37,211,102,.25)",
        },

        Input: {
            borderRadius: 14,
            colorPrimary: "#25D366",
            colorBorder: "#D1FAE5",
            activeBorderColor: "#25D366",
            hoverBorderColor: "#25D366",
        },

        Select: {
            borderRadius: 14,
            colorPrimary: "#25D366",
            colorBorder: "#D1FAE5",
        },

        Card: {
            borderRadius: 24,
        },

        Table: {
            borderRadius: 20,
            headerBg: "#ECFDF5",
            headerColor: "#047857",
        },

        Tag: {
            borderRadius: 12,
        },

        Typography: {
            colorText: "#1E293B",
        },

        Modal: {
            borderRadiusLG: 24,
        },

        Menu: {
            itemSelectedBg: "#DCFCE7",
            itemSelectedColor: "#16A34A",
            itemHoverBg: "#F0FDF4",
        },

        Layout: {
            headerBg: "#FFFFFF",
            siderBg: "#FFFFFF",
            bodyBg: "#F8FAFC",
        },
    },
};