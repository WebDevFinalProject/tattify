import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import "./App.css";
import Articles from "./pages/Articles";
import TattooHistory from "./components/article/tattoo-history/TattooHistory";
import SkinCare from "./components/article/skin-care-blog/SkinCare";
import Login from "./components/Login/Login.jsx";
import ArtistProfile from "./pages/ArtistProfile.jsx";
import ArtistForm from "./components/ArtistProfile/ArtistForm.jsx";
import Registration from "./components/Registration/Registration.jsx";
import GlobalTattoo from "./components/article/GlobalTattoo/GlobalTattoo.jsx";
import { useContext } from "react";
import { UserContext } from "./context/ContextProvider.jsx";
import TatooConsiderations from "./components/article/TattooConsideration/TattooConsiderations.jsx";
import ArtistList from "./components/ArtistList/ArtistList.jsx";
import FirstTattooGuide from "./components/article/FirstTattooGuide/FirstTattooGuide.jsx";
import ForgotPassword from "./components/Login/forgotPassword/forgotPassword.jsx";
import ResetPassword from "./components/Login/forgotPassword/resetPassword.jsx";
import Forum from "./components/Community/Forum.jsx";

function App() {
  const { user } = useContext(UserContext);
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
        <Route
          path="/article/first-tattoo-guide"
          element={<FirstTattooGuide />}
        />
        <Route path="/article/global-tattoo" element={<GlobalTattoo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />

        <Route path="/artists" element={<ArtistList />} />
        <Route path="/customer-profile" element={user && <ArtistList />} />
        <Route path="/artist/create-profile" element={<ArtistForm />} />
        <Route path="/artist-profile/:id" element={<ArtistProfile />} />
        <Route path="/users/forum" element={<Forum />} />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
