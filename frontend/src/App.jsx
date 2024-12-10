import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import Articles from "./pages/Articles";
import TattooHistory from "./components/article/tattoo-history/TattooHistory";
import SkinCare from "./components/article/skin-care-blog/SkinCare";
import Login from "./components/Login/Login.jsx";
import ArtistProfile from "./pages/ArtistProfile.jsx";
import ArtistForm from "./components/ArtistProfile/ArtistForm.jsx";
import TattooConsiderations from "./components/article/TattooConsideration/TattooConsiderations.jsx";
import ArtistList from "./components/Home/ArtistList.jsx";
import Registration from "./components/Registration/Registration.jsx";
import Customers from "./components/Customers-Profile/Customers.jsx";
import GlobalTattoo from "./components/article/GlobalTattoo/GlobalTattoo.jsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="article/skin-care" element={<SkinCare />} />
                <Route
                    path="article/tattoo-history"
                    element={<TattooHistory />}
                />
                <Route
                    path="article/tattoo-considerations"
                    element={<TattooConsiderations />}
                />
                      <Route path="/article/global-tattoo" element={<GlobalTattoo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/artist-profile" element={<ArtistProfile />} />
                <Route path="/artists" element={<ArtistList />} />
                <Route path="/cutomer-profile" element={<Customers />} />
            </Routes>
        </>
    );

}

export default App;
