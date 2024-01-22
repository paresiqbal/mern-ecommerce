// rdd
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1>E-Commerce</h1>
      <div>
        <NavLink to="/"></NavLink>
        <NavLink to="/home">home</NavLink>
      </div>
    </nav>
  );
}
