// react
import { createContext, useState } from "react";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItem: (newAmount: number, itemId: string) => void;
}

const defaultValues: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItem: () => null,
};

export const ShopContext = createContext<IShopContext>(defaultValues);

export const ShopContextProvider = ({ props }) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
  const addToCart = (itemsId: string) => {};
  const removeFromCart = (itemId: string) => {};
  const updateCartItem = (newAmount: number, itemId: string) => {};

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItem,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
