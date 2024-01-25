// react
import { useEffect, useState } from "react";

// library
import axios from "axios";
import { useGetToken } from "./useGetToken";

export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/product", {
          headers,
        });
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return { products };
};
