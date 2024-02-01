// hooks
import { useGetProducts } from "@/hooks/useGetProducts";

// components
import Product from "./Product";

export default function Shop() {
  const { products } = useGetProducts();

  return (
    <div className="text-center text-5xl font-bold">
      <div>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
}
