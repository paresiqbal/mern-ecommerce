// rdd
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// router
const router = createBrowserRouter([{ path: "/" }]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
