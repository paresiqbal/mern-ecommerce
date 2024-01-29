// rdd
import { NavLink } from "react-router-dom";

// assets
import shop from "@/assets/shop.svg";

export default function Navbar() {
  return (
    <nav className="mx-auto p-4 bg-primary">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink
          to="/"
          aria-label="Go to homepage"
          className="focus: outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-primary lg:absolute lg:left-1/2 lg:-translate-x-1/2 z-50 hover:opacity-75 transition-opacity"
        >
          <img src={shop} alt="Homesmart logo" width="50" className="w-20" />
        </NavLink>
        <div
          role="menubar"
          className="hidden z-40 flex-col gap-4 absolute right-0 left-0 top-16 bg-primary shadow-xl text-center p-6 text-lg font-semibold items-center lg:flex lg:flex-row lg:static lg:shadow-none lg:justify-between lg:w-full"
        >
          <NavLink
            to="/"
            role="menuitem"
            className="py-1 px-6 text dark:text-neutral-600 focus: outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-primary text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            Shop
          </NavLink>
          <NavLink
            to="/"
            role="menuitem"
            className="py-1 px-6 text lg:mr-auto dark:text-neutral-600 focus: outline-none focus-visible:ring-4 ring-neutral-900 rounded-sm ring-offset-4 ring-offset-amber-400 text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            Contact
          </NavLink>
          <NavLink
            to="/auth/signin"
            role="menuitem"
            className="py-1 px-6 text focus: outline-none focus-visible:ring-4 ring-neutral-900 shadow-xl rounded-md ring-offset-4 ring-offset-amber-400 hover:shadow-none transition-shadow text-white bg-teal-900"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/auth/register"
            role="menuitem"
            className="py-1 px-6 text focus: outline-none focus-visible:ring-4 ring-neutral-900 shadow-xl rounded-md ring-offset-4 ring-offset-amber-400 hover:shadow-none transition-shadow text-white bg-teal-900"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
