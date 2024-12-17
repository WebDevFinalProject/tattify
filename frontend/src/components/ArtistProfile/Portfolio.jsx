import { useContext, useState } from "react";
import { H2, PortfolioContainer } from "./styles/StyledComponents";
import UploadPortfolio from "./UploadPortfolio";
import { FiPlus } from "react-icons/fi";
import { UserContext } from "../../context/ContextProvider";

function Portfolio({ artist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle Modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Get user from context
  const { user } = useContext(UserContext);

  // Check if user is logged in and role is "artist"
  const isArtist = user && user.role === "artist";

  return (
    <>
      {artist ? (
        <div className="artist-portfolio-main-container">
          {/* Portfolio Heading */}
          <H2>
            Portfolio {/* Show Plus Icon only if user is logged in */}
            {isArtist && (
              <FiPlus
                className="upload-icon"
                onClick={toggleModal}
                size={40}
                style={{ cursor: "pointer", color: "#555" }}
              />
            )}
          </H2>

          {/* Display Portfolio Images */}
          <PortfolioContainer>
            {artist.portfolio.map((imageUrl, index) => (
              <img
                index={index}
                src={imageUrl}
                alt={`Portfolio image ${index + 1}`}
              />
            ))}
          </PortfolioContainer>
        </div>
      ) : (
        <p>Nothing to show here</p>
      )}
      {/* Upload Modal */}
      {isModalOpen && <UploadPortfolio onClose={toggleModal} />}
    </>
  );
}

export default Portfolio;
