import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import Articles from "./pages/Articles";
import TattooHistory from "./components/article/tattoo-history/TattooHistory";
import SkinCare from "./components/article/skin-care-blog/SkinCare";
import Login from "./components/Login/Login.jsx
import ArtistForm from "./components/ArtistProfile/ArtistForm.jsx";
import TatooConsiderations from "./components/article/TattooConsideration/TattooConsiderations.jsx";

import ArtistProfile from "./components/ArtistProfile/ArtistForm.jsx"
import ArtistList from "./components/Home/ArtistList.jsx";
import Registration from "./components/Registration/Registration.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="article/skin-care" element={<SkinCare />} />
        <Route path="article/tattoo-history" element={<TattooHistory />} />
        <Route
          path="article/tattoo-considerations"
          element={<TatooConsiderations />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/artist-profile" element={<ArtistProfile />} />
        <Route path="/artists" element={<ArtistList/>}/>
      </Routes>
    </>
  );
}

export default App;
