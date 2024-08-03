import "./index.css";
import "./App.css";

import Workspace from "./pages/wkorkspace/Workspace.jsx";
import Board from "./pages/board/Board.jsx";

import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllBoards from "./pages/allBoards/AllBoards.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { Toaster } from "react-hot-toast"; // استيراد Toaster
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Workspace />
      </ProtectedRoute>
    ),
  },
  {
    path: "/board",
    element: (
      <ProtectedRoute>
        <Board />
      </ProtectedRoute>
    ),
  },
  {
    path: "/allBoards",
    element: (
      <ProtectedRoute>
        <AllBoards />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#fff",
          color: "#374151",
        },
      }}
    />
  </>
);
