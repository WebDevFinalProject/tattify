import { useContext, useEffect, useState } from "react";
import { H2, PortfolioContainer } from "./styles/StyledComponents";
import UploadPortfolio from "./UploadPortfolio";
import { BiSolidCameraPlus } from "react-icons/bi";
import { UserContext } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import useImageDelete from "../../hooks/useImageDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Portfolio({ artist }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteImageHandler } = useImageDelete();
  const { user, isOpen, clickHandlerVisibility } = useContext(UserContext);
  const { id } = useParams();
  const [openImg, setOpenImg] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isOwner = user && user?._id === id;

  // Toggle Modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const openImage = (index) => {
    setCurrentIndex(index);
    setOpenImg(true);
  };
  const closeImage = () => setOpenImg(false);

  /* stop the background from scrolling */
  useEffect(() => {
    if (openImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openImg]);

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
              <div key={index} className="portfolio-image-box">
                <img
                  index={index}
                  src={imageUrl}
                  alt={`Portfolio image ${index + 1}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => openImage(index)}
                />
                {isOwner && (
                  <button
                    className="delete-button"
                    onClick={() => deleteImageHandler(imageUrl)}
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}
              </div>
            ))}
            {/* image clickable  */}
            {openImg && (
              <div className="modal">
                <button className="close-button" onClick={closeImage}>
                  Close
                </button>
                <Swiper
                  initialSlide={currentIndex}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  modules={[Navigation, Mousewheel, Keyboard]}
                  mousewheel={true}
                  keyboard={true}
                  className="swiper-container"
                >
                  {artist.portfolio.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={imageUrl}
                        alt={`Portfolio ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "80%",
                          objectFit: "contain",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
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
