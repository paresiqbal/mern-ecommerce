import { useGetProducts } from "@/hooks/useGetProducts";
import { useGetToken } from "@/hooks/useGetToken";
import { IProduct } from "@/models/interfaces";
import axios from "axios";
import { createContext, useState, ReactNode } from "react";

export interface IShopContext {
  getCartItems: (itemId: string) => number;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (newAmount: number, itemId: string) => void;
  getTotalCartItems: () => number;
  checkout: () => void;
}

const defaultValues: IShopContext = {
  getCartItems: () => 0,
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItem: () => null,
  getTotalCartItems: () => 0,
  checkout: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultValues);

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const { products } = useGetProducts();
  const { headers } = useGetToken();

  const getCartItems = (itemId: string): number => {
    return cartItems[itemId] || 0;
  };

  const addToCart = (itemId: string) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: (prevCartItems[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: string) => {
    if (!itemId) return;
    if (cartItems[itemId] === 0) return;
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: prevCartItems[itemId] - 1,
    }));
  };

  const updateCartItem = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: newAmount,
    }));
  };

  const getTotalCartItems = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct | undefined = products.find(
          (product) => product._id === item
        );
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("customerID"), cartItems };
    try {
      await axios.post("http://localhost:3001/product/checkout", body, {
        headers,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const contextValue: IShopContext = {
    getCartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    getTotalCartItems,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
