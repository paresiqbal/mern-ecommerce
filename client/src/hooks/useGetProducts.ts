// react
import { useEffect, useState } from "react";

// library
import axios from "axios";

// hooks
import { useGetToken } from "./useGetToken";

// get all products
export const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const { headers } = useGetToken();

  const getProducts = async () => {
    try {
      const fetchedProducts = await axios.get(
        "http://localhost:3001/products",
        {
          headers,
        }
      );
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
