import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import Articles from "./pages/Articles";
import TattooHistory from "./components/article/tattoo-history/TattooHistory";
import SkinCare from "./components/article/skin-care-blog/SkinCare";
import Login from "./components/Login/Login.jsx";
import Registration from "./pages/Registration.jsx";
import ArtistForm from "./components/ArtistProfile/ArtistForm.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="article/skin-care" element={<SkinCare />} />
        <Route path="article/tattoo-history" element={<TattooHistory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/artist-profile" element={<ArtistForm />} />
      </Routes>
    </>
  );
}

export default App;
