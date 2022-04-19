import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";


// const initialState = {
//     watchlist: localStorage.getItem("watchlist")
//       ? JSON.parse(localStorage.getItem("watchlist"))
//       : [],
//     watched: localStorage.getItem("watched")
//       ? JSON.parse(localStorage.getItem("watched"))
//       : [],
//   };

// Initial State
const initialState = {
    favourites: []
  };

// Create Context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    const addBankToFavourites = banks => {
        dispatch({type: "ADD_BANK_TO_FAVOURITES", payload: banks})
    }

    return (
        <GlobalContext.Provider
         value={{
             favourites: state.favourites,
             addBankToFavourites,
             }}>
            {props.children}
        </GlobalContext.Provider>
    )

};