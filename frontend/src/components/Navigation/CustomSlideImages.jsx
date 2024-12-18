import React from "react";
import ad1 from "../../assets/dropdown-ads/ad1.webp";
import ad2 from "../../assets/dropdown-ads/ad2.webp";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

const CustomSlideImages = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        autoplay={{ delay: 4000 }}
        effect={"fade"}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper2"
      >
        <SwiperSlide className="slide-images">
          <img src={ad1} />
        </SwiperSlide>
        <SwiperSlide className="slide-images">
          <img src={ad2} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CustomSlideImages;
