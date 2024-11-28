import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import Blog from "./components/article/Blog";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
