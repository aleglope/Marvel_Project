import { useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { fetchOneCharacter } from "../../helpers/fetchOneCharacter";
import { fetchDataComics } from "../../helpers/fetchDataComics";
import { useFavorite } from "../../Hooks/useFavorite";
import imageFavoriteSelected from "../../assets/Images/image-favorite-selected.svg";
import imageFavoriteUnselected from "../../assets/Images/image-favorite-unselected.svg";
import "./characterDetails.css";


export const CharacterDetails = () => {
  const { id } = useParams();
  const { state, setState } = useContext(AppContext);
  let data = state?.oneCharacter;
  let dataComics = state?.comics;
  const { toggleFavorite } = useFavorite();
  
  useEffect(() => {
    if (id) {
      let resultOneCharacter = fetchOneCharacter(id);
      resultOneCharacter
        .then((response) => {
          setState((prevState) => ({
            ...prevState,
            oneCharacter: response.data.results[0],
          }));
        })
        .catch((error) => {
          console.log(error);
        });

      let resultComics = fetchDataComics(id);
      // console.log(resultComics);
      resultComics
        .then((res) => {
          setState((prevState) => ({ ...prevState, comics: res.data.results }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, setState]);

  return (
    <>
      <Navbar />
    <div>
      <header>
        <div className="container-generic-header">
          <div className="image-character">
            <img
              className="image-one-characters"
              src={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
              alt="Imagen de super heroe"
            />
          </div>
          <div className="info-character">
            <div className="character-name-favorite">
              <p className="character-name">{data?.name}</p>
              <img
                onClick={() => toggleFavorite(data)}
                src={
                  state.favoritesArray.some(item => item.id === data.id)
                    ? imageFavoriteSelected
                    : imageFavoriteUnselected
                }
                alt="Corazon de favoritos"
                className="character-favorite"
              />
            </div>
            <p className="character-description">{data?.description}</p>
          </div>
        </div>
      </header>
      <div className="container-generic-comics">
        <div className="container-comics">
          <p className="text-comics">COMICS</p>
          <div className="container-images-comics">
            {dataComics?.map((comic) => (
              <div key={comic.id}>
                <img
                  className="unic-image-comic"
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt="Imagen de super heroe"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
