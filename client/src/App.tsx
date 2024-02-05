// rdd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layout
import MainLayout from "./layout/MainLayout";
import ErrorLayout from "./layout/ErrorLayout";

// pages
import Shop from "@/pages/shop";
import Auth from "@/pages/auth/Auth";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Cart from "@/pages/cart";

// context api
import { ShopContextProvider } from "./context/shop-context";

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
        path: "/cart",
        element: <Cart />,
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
          {
            path: "login",
            element: <Login />,
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
      <ShopContextProvider>
        <RouterProvider router={router} />
      </ShopContextProvider>
    </div>
  );
}

export default App;
