import { IShopContext, ShopContext } from "@/context/shop-context";
import { useGetProducts } from "@/hooks/useGetProducts";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";
import CartItems from "./CartItems";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { getCartItems, getTotalCartItems, checkout } =
    useContext<IShopContext>(ShopContext);

  const { products } = useGetProducts();
  const totalAmount = getTotalCartItems();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cart Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: IProduct) => {
          const cartItemCount = getCartItems(product._id);
          if (cartItemCount !== undefined && cartItemCount !== 0) {
            return <CartItems key={product._id} product={product} />;
          }
          return null;
        })}
      </div>
      {totalAmount > 0 ? (
        <div>
          <h2>Sub total: {totalAmount.toFixed(3)}</h2>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
          <button onClick={checkout}>Checkout</button>
        </div>
      ) : (
        <h1>You haven't added an items yet</h1>
      )}
    </div>
  );
}
