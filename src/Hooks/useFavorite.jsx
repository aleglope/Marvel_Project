import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export const useFavorite = () => {
  const { state, setState } = useContext(AppContext);
  // Verificamos si el objeto ("characters") existe en el context "state.favoritesArray"
  //dependiendo de si existe o no ejecutamos la funion añadir o eliminar segun corresponda
  const toggleFavorite = (object) => {
      if (state.favoritesArray.some((item) => item.id === object.id)) {
        removeFromFavorites(object);
      } else {
        addToFavorites(object);
      }

   
  };

  // Funcion para añadir nuevos characters (objetos) y actualizar el estado de favoritos
  // y para añadir los ID de los chararaters y actualizar el Session Storage
  const addToFavorites = (objectToAdd) => {
    // Verificamos si el objeto ("characters") ya está presente en el array de favoritos
    const isAlreadyFavorite = state.favoritesArray.some(
      (item) => item.id === objectToAdd.id
    );

    // Si el objeto no está presente.....
    if (!isAlreadyFavorite) {
      // Actualizamos el estado con el nuevo objeto en favoritesArray
      setState((prevState) => ({
        ...prevState,
        favoritesArray: [...prevState.favoritesArray, objectToAdd],
      }));

      // Obtenemos el array actual de IDs del sessionStorage
      const favoritesIds =
        JSON.parse(sessionStorage.getItem("favorites")) || [];

      // Verificamos si el ID ya está presente en el array de IDs
      const isIdAlreadyFavorite = favoritesIds.includes(objectToAdd.id);

      // Si el ID no está presente, agregarlo al array de IDs y actualizar el sessionStorage
      if (!isIdAlreadyFavorite) {
        const updatedFavoritesIds = [...favoritesIds, objectToAdd.id];
        sessionStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavoritesIds)
        );
      }
    }
  };

  // Funcion para eliminar characters (objetos) y actualizar el estado de favoritos
  // y para eliminar los ID de los chararaters y actualizar el Session Storage
  const removeFromFavorites = (objectToRemove) => {
    
    const idToRemove = objectToRemove.id;

    // Eliminamos el objeto y actualizamos el estado favoritesArray
    setState((prevState) => ({
      ...prevState,
      favoritesArray: prevState.favoritesArray.filter(
        (elem) => elem.id !== idToRemove
      ),
    }));

    // Obtenemos el array actual de IDs del sessionStorage
    const favoritesIds = JSON.parse(sessionStorage.getItem("favorites")) || [];

    // Eliminamos ID y actualzamos el sessionStorage
    const updatedFavoritesIds = favoritesIds.filter((id) => id !== idToRemove);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavoritesIds));
  };
  console.log(state.favoritesArray, "2222222222222222222222222222222222222222222222222");
  return { toggleFavorite };
};
