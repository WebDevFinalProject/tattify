import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import SkinCare from "./components/article/SkinCare";
import Articles from "./pages/Articles";
import TattooHistory from "./components/article/TattooHistory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="article/skin-care" element={<SkinCare />} />
        <Route path="article/tattoo-history" element={<TattooHistory />} />
      </Routes>
    </>
  );
}

export default App;
