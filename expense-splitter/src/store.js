import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./features/groupsSlice";
import { loadState, saveState } from "./features/localStorageUtils";

// load the state from local storage if present
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

//  uncomment line below and reload page 2x to remove local storage, for testing purposes or just remove manually in the local storage tab in dev tools

// this one to uncomment =>>> localStorage.removeItem("appState");

