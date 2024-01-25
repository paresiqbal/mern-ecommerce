// custom hooks
import { useGetProducts } from "@/hooks/useGetProducts";

export default function Shop() {
  const { products } = useGetProducts();

  return (
    <div>
      {products &&
        products.map((product) => (
          <div key={product.id}>{product.product_name}</div> // Assuming each product has a unique 'id'
        ))}
    </div>
  );
}
