import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import marvelLogo from "../../assets/Images/marvel-logo.svg";
import imageFavoriteSelected from "../../assets/Images/image-favorite-selected.svg";
import imageFavoriteUnselected from "../../assets/Images/image-favorite-unselected.svg";
import "./navbar.css";

export const Navbar = ({ setSearchText = null }) => {
  const navigate = useNavigate();
  const { state, setState } = useContext(AppContext);
  let numbersFavorites = state?.favoritesArray?.length;
  let resultImage =
    numbersFavorites !== 0 ? imageFavoriteSelected : imageFavoriteUnselected;

  const navigateCharacters = () => {
    setState({ ...state, viewFavorites: false, resultSearch: state.data });
    setSearchText && setSearchText("");
    navigate(`/`);
  };

  const showFavorites = () => {
    setState({
      ...state,
      viewFavorites: true,
      resultSearch: state.favoritesArray,
    });
    setSearchText && setSearchText("");
    navigate(`/`);
  };

  return (
    <nav className="navbar-container">
      <div onClick={navigateCharacters} className="logo-marbel">
        <img src={marvelLogo} alt="" className="image-logo" />
      </div>
      <div className="favorite-navbar">
        <img
          onClick={showFavorites}
          src={resultImage}
          alt=""
          className="favorite"
        />
        <p>{numbersFavorites}</p>
      </div>
    </nav>
  );
};
