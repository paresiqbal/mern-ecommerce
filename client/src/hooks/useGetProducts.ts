// library
import { useEffect, useState } from "react";
import axios from "axios";

// hooks
import { useGetToken } from "./useGetToken";
import { IProduct } from "@/models/interfaces";

export const useGetProducts = () => {
  // Specify the type of the products state
  const [products, setProducts] = useState<IProduct[]>([]);
  const { headers } = useGetToken();

  const getProducts = async () => {
    try {
      const fetchedProducts = await axios.get("http://localhost:3001/product", {
        headers,
      });
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products };
};
