import { IProduct } from "@/models/interfaces";

interface Props {
  product: IProduct;
}

export default function CartItems(props: Props) {
  const { _id, productName, imageURL, price, stockQuantity } = props.product;
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
          <button>-</button>
          <input type="number" />
          <button>+</button>
        </div>
      </div>
    </div>
  );
}
