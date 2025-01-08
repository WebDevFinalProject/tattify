import { useContext, useState } from "react";
import { H2, PortfolioContainer } from "./styles/StyledComponents";
import UploadPortfolio from "./UploadPortfolio";
import { BiSolidCameraPlus } from "react-icons/bi";
import { UserContext } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import useImageDelete from "../../hooks/useImageDelete";

function Portfolio({ artist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteImageHandler } = useImageDelete();
  const { user, isOpen, clickHandlerVisibility } = useContext(UserContext);
  const { id } = useParams();

  const isOwner = user && user?._id === id;

  // Toggle Modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
              <div key={index} className="porfolio-image-box">
                <img
                  index={index}
                  src={imageUrl}
                  alt={`Portfolio image ${index + 1}`}
                />
                {isOwner && (
                  <button onClick={() => deleteImageHandler(imageUrl)}>
                    delete
                  </button>
                )}
              </div>
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
