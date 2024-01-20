// rdd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import MainLayout from "@/layout/MainLayout";
import Error from "@/pages/Error";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [{}],
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
