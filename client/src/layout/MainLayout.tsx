// rdd
import { Outlet } from "react-router";

// components
import Navbar from "@/components/Navbar";
import Shop from "@/pages/shop";

export default function MainLayout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
        <Shop />
      </main>
    </div>
  );
}
