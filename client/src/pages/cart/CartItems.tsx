import { IProduct } from "@/models/interfaces";

interface Props {
  product: IProduct;
}

export default function cartItems(props: Props) {
  const { _id, imageURL, productName, price } = props.product;

  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        className="w-20 h-20 object-cover"
        src={imageURL}
        alt={`Image of ${productName}`}
      />
      <div className="px-4 py-2">
        <div className="text-sm font-bold">{productName}</div>
        <p className="text-xs text-gray-600">${price}</p>
      </div>
    </div>
  );
}
