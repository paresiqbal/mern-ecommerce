import { IProduct } from "@/models/interfaces";

interface Props {
  product: IProduct;
}

export default function cartItems(props: Props) {
  const { _id, imageURL, productName, price } = props.product;

  return (
    <div>
      <img className="w-full" src={imageURL} alt="product image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-800 font-bold">${price}</p>
      </div>
    </div>
  );
}
