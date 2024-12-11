import ProfileImagePlaceholder from "../../assets/profile-image-placeholder.jpg";
import "./styles/main-info.css";
import api from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

function MainInfo() {
    // const { user } = useContext(UserContext);
    const { artistId } = useParams();
    const [Artist, setArtist] = useState(null);

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await api.get(`/api/artist/profile/${artistId}`);
                setArtist(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchArtist();
    }, [artistId]);

    return (
        <div className="artist-profile-main-info-container">
            {Artist.map((artist) => (
                <div>
                    <h2>Domi</h2>
                </div>
            ))}
        </div>
    );
}

export default MainInfo;
