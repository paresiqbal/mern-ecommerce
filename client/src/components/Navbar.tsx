// rdd
import { NavLink } from "react-router-dom";

// icons
import { AiFillShopping, AiOutlineShoppingCart } from "react-icons/ai";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-20 py-5 bg-white shadow-lg text-xl">
      <div className="flex items-center gap-2">
        <h1>E-Commerce</h1>
        <AiFillShopping />
      </div>
      <div className="flex items-center gap-4">
        <NavLink to="/items">ITEMS</NavLink>
        <NavLink to="/purchase">PURCHASE</NavLink>
        <NavLink to="/cart">
          <AiOutlineShoppingCart />
        </NavLink>
      </div>
    </nav>
  );
}
