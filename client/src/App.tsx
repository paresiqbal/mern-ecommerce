// rdd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import MainLayout from "@/layout/MainLayout";
import Error from "@/pages/Error";
import Auth from "@/pages/auth";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
        errorElement: <Error />,
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
