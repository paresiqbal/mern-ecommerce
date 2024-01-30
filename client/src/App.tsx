// rdd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import MainLayout from "./layout/MainLayout";
import ErrorLayout from "./layout/ErrorLayout";

// pages
import Shop from "@/pages/shop";
import Auth from "@/pages/auth/Auth";
import Register from "@/pages/auth/register";

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
        path: "auth",
        errorElement: <ErrorLayout />,
        children: [
          {
            path: "landing",
            element: <Auth />,
            errorElement: <ErrorLayout />,
          },
          {
            path: "register",
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
