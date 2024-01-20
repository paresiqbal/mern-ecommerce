// rdd
import { Outlet } from "react-router";

// components
import Navbar from "@/components/Navbar";

export default function MainLayout() {
  return (
    <div>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
}
