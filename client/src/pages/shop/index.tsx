// hooks
import { useGetProducts } from "@/hooks/useGetProducts";

export default function Shop() {
  const { products } = useGetProducts();

  return (
    <div className="text-center text-5xl font-bold">
      <div>
        {products.map((product) => (
          <div>
            <p>{product.productName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
