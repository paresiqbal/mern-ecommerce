import { IShopContext, ShopContext } from "@/context/shop-context";
import { useGetProducts } from "@/hooks/useGetProducts";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";

export default function Cart() {
  const { getCartItems } = useContext<IShopContext>(ShopContext);

  const { products } = useGetProducts();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cart Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: IProduct) => {
          const quantity = getCartItems(product._id);
          if (quantity > 0) {
            return (
              <div
                key={product._id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white py-2"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={product.imageURL}
                  alt={product.productName}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {product.productName}
                  </div>
                  <p className="text-gray-800 text-base">
                    Price: ${product.price}
                  </p>
                  <p className="text-gray-800 text-base">
                    Quantity: {quantity}
                  </p>
                  <div className="flex">
                    <button>-</button>
                    <input type="number" />
                    <button>+</button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
