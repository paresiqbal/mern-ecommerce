// hooks
import { useGetProducts } from "@/hooks/useGetProducts";

// components
import Product from "./Product";

export default function Shop() {
  const { products } = useGetProducts();

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
