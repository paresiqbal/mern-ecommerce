import { createContext, useState } from "react";

export interface IShopContext {
  getCartItems: (itemId: string) => number;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (newAmount: number, itemId: string) => void;
}

const defaultValues: IShopContext = {
  getCartItems: () => 0,
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItem: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultValues);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number } | {}>(
    {}
  );

  const getCartItems = (itemId: string): number => {
    if (cartItems[itemId]) {
      return cartItems[itemId];
    }

    return 0;
  };

  // Functions to be implemented
  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems({ ...cartItems, [itemId]: 1 });
    } else {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    }
  };
  const removeFromCart = (itemId: string) => {
    /* Implementation */
  };
  const updateCartItem = (newAmount: number, itemId: string) => {
    /* Implementation */
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
