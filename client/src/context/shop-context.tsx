// react
import { createContext } from "react";

interface IShopContextType {}

const defaultValues: IShopContextType = {};

export const ShopContext = createContext<IShopContextType>({});

export const ShopContextProvider = ({ props }) => {};
