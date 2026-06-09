import "./App.css";

import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
  useNavigate,
} from "react-router-dom";

import routes from "~react-pages";
import NotFound from "./views/errors/404";
import useNetworkStatus from "./hooks/useNetworkStatus";
import NetworkError from "./views/errors/NetworkError";
import { Spin, Typography } from "antd";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();

  const { Text } = Typography;

  const [authChecked, setAuthChecked] =
    useState(false);

  const Loader = () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Text strong>
        WhatsApp Bot is loading...
      </Text>

      <Spin size="large" />
    </div>
  );

  const element = useRoutes([
    ...routes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  const cleanPath =
    location.pathname.replace(/\/+$/, "") ||
    "/";

  useEffect(() => {
    const accessToken =
      localStorage.getItem("accessToken");

    const isAuthenticated =
      !!accessToken;

    // Not logged in
    if (
      !isAuthenticated &&
      cleanPath !== "/login"
    ) {
      navigate("/login", {
        replace: true,
      });
    }

    // Already logged in
    if (
      isAuthenticated &&
      cleanPath === "/login"
    ) {
      navigate("/", {
        replace: true,
      });
    }

    setAuthChecked(true);
  }, [navigate, cleanPath]);

  if (!authChecked) {
    return <Loader />;
  }

  return (
    <>
      {!isOnline ? (
        <NetworkError />
      ) : (
        <Suspense fallback={<Loader />}>
          {element}
        </Suspense>
      )}
    </>
  );
}

export default function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}