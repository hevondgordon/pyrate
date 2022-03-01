import React, { useState, createContext, ReactNode, useEffect } from "react";
import { IMenuProviderContext } from "../types";
import { fetcher } from '../data/utils'
import { ROUTE as GET_SERVICES_ROUTE } from './../pages/api/services/index';
import useSWR from 'swr'


const defaultMenu = {
  menuItems: [],
  setMenuItems: () => { },
};

// Create Context Object
export const MenuContext = createContext<IMenuProviderContext>(defaultMenu);

// Create a provider for components to consume and subscribe to changes
export const MenuContextProvider = (props: { children: ReactNode }) => {
  const { data: services } = useSWR(GET_SERVICES_ROUTE, fetcher)

  const menuItems: string[] = [];
  const [menu, setMenuItems] = useState(menuItems);

  useEffect(() => {
    setMenuItems(services);
  }, [services]);


  return (
    <MenuContext.Provider value={{ menuItems: menu, setMenuItems }}>
      {props.children}
    </MenuContext.Provider>
  );

};
