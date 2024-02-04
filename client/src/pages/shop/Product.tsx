// react
import { useContext } from "react";

// interfaces models
import { IProduct } from "@/models/interfaces";

// custom context
import { IShopContext, ShopContext } from "@/context/shop-context";

// shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  product: IProduct;
}

export default function Product(props: Props) {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  const { addToCart, getCartItems } = useContext<IShopContext>(ShopContext);

  const counter = getCartItems(_id);

  return (
    <Card>
      <CardHeader>
        <img src={imageURL} alt="product_image" />
        <CardTitle>{productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="font-bold">Rp. {price},000</p>
        <p>Stock ({stockQuantity})</p>
      </CardFooter>
    </Card>
  );
}
