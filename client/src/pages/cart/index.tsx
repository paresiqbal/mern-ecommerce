import { IShopContext, ShopContext } from "@/context/shop-context";
import { useGetProducts } from "@/hooks/useGetProducts";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";

export default function Cart() {
  const { getCartItems } = useContext<IShopContext>(ShopContext);

  const { products } = useGetProducts();

  return (
    <div>
      <h1>Cart Items</h1>
      <div>
        {products.map((product: IProduct) => {
          if (getCartItems(product._id) > 0) {
            return (
              <div key={product._id}>
                <img
                  className="w-full"
                  src={product.imageURL}
                  alt="product image"
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {product.productName}
                  </div>
                  <p className="text-gray-800 font-bold">${product.price}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
