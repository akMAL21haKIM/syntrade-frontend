import React from "react";
import UserStore from "./user-store";

class RootStore {
  constructor() {
    this.user_store = new UserStore(this);
  }
}

let stores_context;

export const useStores = () => {
  if (!stores_context) {
    const root_store = new RootStore();

    stores_context = React.createContext({
      user_store: root_store.user_store,
    });
  }

  return React.useContext(stores_context);
};
