import { useContext, useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Search } from "../Search/Search";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { useFavorite } from "../../Hooks/useFavorite";
import imageFavoriteSelected from "../../assets/Images/image-favorite-selected.svg";
import imageFavoriteUnselected from "../../assets/Images/image-favorite-unselected.svg";
import "./charactersList.css";

export const CharactersList = () => {
  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");
  // let data = state?.resultSearch;
  let data;
  if (state.viewFavorites) {
    data = state?.resultSearch;
  } else {
    // data = state?.data;
    data = state?.resultSearch;
  }

  const { toggleFavorite } = useFavorite();

  // const getFaforites = () => {
  //   //  hacer un filter con los id que esten en favoritos hacerlo si el array de favoritos esta lleno y si
  // };

  // Funcion para redirigir a la vista de un ID en concreto
  const navigateUniqueCharacter = (e, id) => {
    if (id && e.target.className !== "image-favorite") {
      navigate(`/characterDetails/${id}`);
    }
  };

  return (
    <>
      <Navbar setSearchText={setSearchText}/>
      {/* <div className={state.viewFavorites ? "container-list-favorites":"container-list"}> */}
      {state.viewFavorites && <p className="text-favorites">FAVORITOS</p>}
      <Search searchText={searchText} setSearchText={setSearchText} />
      {/* </div> */}
      <div className={state.viewFavorites || state.resultSearch.length !== 50 ? "container-list-favorites":"container-list"}>
 
        {/* {data?.map((data) => ( */}
        {data?.map((data) => (
          <div
            onClick={(e) => navigateUniqueCharacter(e, data.id)}
            key={data.id}
            className="container-characters"
          >
            <div className="container-img">
              <img
                className="images-characters"
                src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
                alt="Imagen de super heroe"
              />
            </div>
            {/* <div className="container-name">{data.name}</div> */}
            <div className="container-name">
            {/* <div className="white-triangle"></div> */}
              <div className="container-text-favorite">
                <p className="name-character">{data?.name?.split(" (")[0]}</p>
                <img
                  className="image-favorite"
                  onClick={() => toggleFavorite(data)}
                  src={
                    state.favoritesArray.some((item) => item.id === data.id)
                      ? imageFavoriteSelected
                      : imageFavoriteUnselected
                  }
                  alt="Corazon de favoritos"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
