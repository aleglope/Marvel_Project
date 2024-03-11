import {BrowserRouter, Route, Routes} from "react-router-dom";
import { CharactersList } from "../Components/CharactersList/CharactersList";
import { CharacterDetails } from "../Components/CharacterDetails/CharacterDetails";
import { Error } from "../Components/Error";
// import { Navbar } from "../Components/Navbar/Navbar";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
    {/* <Navbar/> */}
    <Routes>
        <Route path="/" element={<CharactersList/>}/>
        <Route path="/characterDetails/:id" element={<CharacterDetails/>}/>
        <Route path="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>
  )
}
