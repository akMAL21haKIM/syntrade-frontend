import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function CarouselSignUp() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-lg"
      >
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138__340.jpg"
            alt="image slide 1"
          />
          <p>
            Oh, misty eye of the mountain below Keep careful watch of my
            brothers souls And should the sky be filled with fire and smoke Keep
            watching over Durin&apos;s sons If this is to end in fire Then we
            should all burn together Watch the flames climb high into the night
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://cdn.pixabay.com/photo/2022/07/24/17/55/wind-energy-7342177__340.jpg"
            alt="image slide 2"
          />
          <p>
            Calling out father oh Stand by and we will Watch the flames burn
            auburn on The mountain side (high) And if we should die tonight Then
            we should all die together Raise a glass of wine for the last time
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://cdn.pixabay.com/photo/2022/07/26/03/35/jogger-7344979__340.jpg"
            alt="image slide 3"
          />
          <p>
            Calling out father oh Prepare as we will Watch the flames burn
            auburn on The mountain side Desolation comes upon the sky Now I see
            fire Inside the mountain And I see fire Burning the trees And I see
            fire Hollowing souls And I see fire Blood in the breeze And I hope
            that you remember me
          </p>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
