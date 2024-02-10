import { createContext, useState, ReactNode } from "react";

export interface IShopContext {
  getCartItems: (itemId: string) => number;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (newAmount: number, itemId: string) => void;
}

const defaultValues: IShopContext = {
  getCartItems: () => 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItem: () => {},
};

export const ShopContext = createContext<IShopContext>(defaultValues);

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

  const getCartItems = (itemId: string): number => {
    return cartItems[itemId] || 0;
  };

  const addToCart = (itemId: string) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [itemId]: prevCartItems[itemId] - 1,
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

  const contextValue: IShopContext = {
    getCartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
