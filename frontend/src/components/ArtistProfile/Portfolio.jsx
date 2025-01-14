import { useContext, useState } from "react";
import {
  H2,
  PortfolioContainer,
  PortfolioPagination,
} from "./styles/StyledComponents";
import UploadPortfolio from "./UploadPortfolio";
import { BiSolidCameraPlus } from "react-icons/bi";
import { UserContext } from "../../context/ContextProvider";
import { useParams } from "react-router-dom";
import useImageDelete from "../../hooks/useImageDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useStopScroll from "../../hooks/useStopScroll";
import usePagination from "../../hooks/usePaginationHook";
import { IoArrowBackOutline,IoArrowForwardOutline } from "react-icons/io5";

function Portfolio({ artist }) {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteImageHandler } = useImageDelete();
  const [openImg, setOpenImg] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isOwner = user && user?._id === id;

  // Pagination logic using custom hook
  const itemsPerPage = 6;
  const { currentItems, currentPage, totalPages, nextPage, prevPage } =
    usePagination(artist ? artist.portfolio : [], itemsPerPage);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  useStopScroll(isModalOpen);

  const openImage = (index) => {
    setCurrentIndex(index);
    setOpenImg(true);
  };
  const closeImage = () => setOpenImg(false);

  useStopScroll(openImg);

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
            {currentItems.map((imageUrl, index) => (
              <div key={index} className="portfolio-image-box">
                <img
                  index={index}
                  src={imageUrl}
                  alt={`Portfolio image ${index + 1}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => openImage(currentPage * itemsPerPage + index)}
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
            {/* Modal for image preview */}
            {openImg && (
              <div className="modal">
                <button id="close-button-swiper" onClick={closeImage}>
                  x
                </button>
                <Swiper
                  initialSlide={currentIndex}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  modules={[Navigation, Mousewheel, Keyboard, Pagination]}
                  mousewheel={true}
                  keyboard={true}
                  className="swiper-portfolio"
                >
                  {artist.portfolio.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={imageUrl}
                        alt={`Portfolio ${index + 1}`}
                        id="porfolio-swipe"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </PortfolioContainer>

          {/* Pagination Controls */}
          <PortfolioPagination>
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="portfolio-pagination-button"
            >
              <IoArrowBackOutline />
            </button>
            <span>
              {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="portfolio-pagination-button"
            >
              <IoArrowForwardOutline />
            </button>
          </PortfolioPagination>
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
