import { Route, Routes } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Favourites from "./pages/Favourites";
import FavouriteShows from "./pages/FavouriteShows";
import FavouriteEpisodes from "./pages/FavouriteEpisodes";
import { ShowProvider } from "./contexts/ShowContext";
import Show from "./pages/Show";

function App() {
  return (
    <>
      <ShowProvider>
        <NavBar />
        <div className="container-800">
          <Routes>
            <Route index element={<Home />} />
            <Route path="show/:id" element={<Show />} />
            <Route path="favourites">
              <Route index element={<Favourites />} />
              <Route path="shows" element={<FavouriteShows />} />
              <Route path="episodes" element={<FavouriteEpisodes />} />
            </Route>
            <Route path="about" element={<About />} />
          </Routes>
        </div>
      </ShowProvider>
    </>
  );
}

export default App;
