import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

// import required modules
import { EffectCube, Pagination, Mousewheel, Keyboard } from "swiper/modules";

//img
import skincare1 from "../../../assets/blogs-images/after care 1.jpg";
import skincare2 from "../../../assets/blogs-images/after care 2.jpg";
import skincare3 from "../../../assets/blogs-images/after care 3.webp";

const CustomSlider = () => {
  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        mousewheel={true}
        keyboard={true}
        loop={true}
        pagination={{
          clickable: true, // Make pagination clickable
        }}
        modules={[EffectCube, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={skincare1} alt="" className="skin-care-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={skincare2} alt="" className="skin-care-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={skincare3} alt="" className="skin-care-img" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={skincare2} alt="" className="skin-care-img" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CustomSlider;
