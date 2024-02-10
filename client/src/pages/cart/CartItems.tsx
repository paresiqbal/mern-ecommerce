import { IShopContext, ShopContext } from "@/context/shop-context";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";

interface Props {
  product: IProduct;
}

export default function CartItems(props: Props) {
  const { _id, productName, imageURL, price, stockQuantity } = props.product;
  const { addToCart, removeFromCart, updateCartItem, getCartItems } =
    useContext<IShopContext>(ShopContext);

  const cartItemCount = getCartItems(_id);

  return (
    <div
      key={_id}
      className="max-w-sm rounded overflow-hidden shadow-lg bg-white py-2"
    >
      <img
        className="w-full h-48 object-cover"
        src={imageURL}
        alt={productName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-800 text-base">Price: ${price}</p>
        <p className="text-gray-800 text-base">Quantity: {stockQuantity}</p>
        <div className="flex">
          <button onClick={() => removeFromCart(_id)}>-</button>
          <input
            type="number"
            value={cartItemCount}
            onChange={(e) => updateCartItem(Number(e.target.value), _id)}
          />
          <button onClick={() => addToCart(_id)}>+</button>
        </div>
      </div>
    </div>
  );
}
