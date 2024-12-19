import { useContext, useState } from "react";
import { H2, PortfolioContainer } from "./styles/StyledComponents";
import UploadPortfolio from "./UploadPortfolio";
import { BiSolidCameraPlus } from "react-icons/bi";
import { UserContext } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";

function Portfolio({ artist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle Modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Get user from context
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const isOwner = user && user?._id === id;

  return (
    <>
      {artist ? (
        <div className="artist-portfolio-main-container">
          {/* Portfolio Heading */}
          <div className="portfolio-header">
            <H2>Portfolio</H2>
            {isOwner && (
              <BiSolidCameraPlus
                className="upload-icon"
                onClick={toggleModal}
              />
            )}
          </div>

          {/* Display Portfolio Images */}
          <PortfolioContainer>
            {artist.portfolio.map((imageUrl, index) => (
              <img
                key={index}
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
