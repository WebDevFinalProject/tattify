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
        <Route path="/article" element={<Articles />}>
          <Route path="skin-care" element={<SkinCare />} />
          <Route path="tattoo-history" element={<TattooHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
