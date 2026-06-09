import "./App.css";

import { Suspense } from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
  Navigate,
} from "react-router-dom";

import routes from "~react-pages";
import NotFound from "./views/errors/404";
import useNetworkStatus from "./hooks/useNetworkStatus";
import NetworkError from "./views/errors/NetworkError";
import { Spin, Typography } from "antd";

function App() {
  const location = useLocation();
  const isOnline = useNetworkStatus();

  const { Text } = Typography;

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
    location.pathname.replace(/\/+$/, "") || "/";

  // Authentication Check
  const accessToken =
    localStorage.getItem("accessToken");

  const persistedAuth =
    localStorage.getItem("persist:auth");

  let authExists = false;

  try {
    if (persistedAuth) {
      const parsed = JSON.parse(persistedAuth);

      authExists =
        !!parsed?.auth &&
        parsed?.auth !== "null" &&
        parsed?.auth !== "";
    }
  } catch (error) {
    authExists = false;
  }

  const isAuthenticated =
    !!accessToken && authExists;

  console.log({
    accessToken,
    persistedAuth,
    authExists,
    isAuthenticated,
    cleanPath,
  });

  // Not logged in -> always go to login
  if (
    !isAuthenticated &&
    cleanPath !== "/login"
  ) {
    return <Navigate to="/login" replace />;
  }

  // Already logged in -> don't allow login page
  if (
    isAuthenticated &&
    cleanPath === "/login"
  ) {
    return <Navigate to="/" replace />;
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