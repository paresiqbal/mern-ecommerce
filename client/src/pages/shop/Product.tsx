import { IShopContext, ShopContext } from "@/context/shop-context";
import { IProduct } from "@/models/interfaces";
import { useContext } from "react";

interface Props {
  product: IProduct;
}

export default function Product(props: Props) {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  const { addToCart, getCartItems } = useContext<IShopContext>(ShopContext);

  const counter = getCartItems(_id);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={imageURL} alt="product image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-800 font-bold">${price}</p>
        <p className="text-gray-600">Stock: {stockQuantity}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => addToCart(_id)}
        >
          Add to cart {counter > 0 && <p>{counter}</p>}
        </button>
        {stockQuantity === 0 && (
          <h3 className="text-red-500 text-xs italic">Out of stock</h3>
        )}
      </div>
    </div>
  );
}
