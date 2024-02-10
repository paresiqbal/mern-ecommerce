import { IShopContext, ShopContext } from "@/context/shop-context";
import { useGetProducts } from "@/hooks/useGetProducts";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";
import CartItems from "./CartItems";

export default function Cart() {
  const { getCartItems } = useContext<IShopContext>(ShopContext);

  const { products } = useGetProducts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cart Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: IProduct) => {
          const cartItemCount = getCartItems(product._id);
          if (cartItemCount !== undefined && cartItemCount !== 0) {
            return <CartItems key={product._id} product={product} />;
          }
          return null; // return null if cartItemCount is 0 or undefined
        })}
      </div>
    </div>
  );
}
