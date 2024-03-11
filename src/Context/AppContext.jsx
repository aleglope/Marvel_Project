import { createContext, useEffect, useState } from "react";
import { fetchData } from "../helpers/fetchData";

const AppContext = createContext();

let initialState = {
  data: [],
  resultSearch: [],
  favoritesArray: [],
  oneCharacter: {},
  comics: [],
  viewFavorites: false
};

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let res = fetchData();

    res
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          data: response.data.results,
          resultSearch: response.data.results,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const myData = JSON.parse(sessionStorage.getItem("favorites"));
    let favorite = [];

    myData?.forEach((dataId) => {
      const foundCharacter = state?.data?.find((character) => character.id === dataId);
      if (foundCharacter) {
        favorite.push(foundCharacter);
      }
    });
    
    if (myData) {
      setState((prevState) => ({
        ...prevState,
        favoritesArray: favorite,
      }));
    }
  }, [state.data]);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
