// rdd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import MainLayout from "./layout/MainLayout";
import ErrorLayout from "./layout/ErrorLayout";

// pages
import Shop from "@/pages/shop";
import Auth from "@/pages/auth";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// route
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: "/",
        element: <Shop />,
        errorElement: <ErrorLayout />,
      },
      {
        path: "/auth",
        element: <Auth />,
        errorElement: <ErrorLayout />,
        children: [
          {
            path: "/auth/signin",
            element: <Login />,
            errorElement: <ErrorLayout />,
          },
          {
            path: "/auth/signup",
            element: <Register />,
            errorElement: <ErrorLayout />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
