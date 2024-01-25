// rdd
import Navbar from "@/components/Navbar";

// components
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-6 lg:px-36 mx-auto text-gray-900">
        <Outlet />
      </main>
    </div>
  );
}
