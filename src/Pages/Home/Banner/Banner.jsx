import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import club from '../../../assets/club.png'
import courts from '../../../assets/courts.jpg'
import activity from '../../../assets/activity.jpg'
const Banner = () => {
  const slides = [
    { image: club, caption: 'Welcome to Our ', cap:'Sports Club', des:'Join a community where passion meets excellence. Experience world-class facilities and dedicated support to elevate your game.'},
    { image:  courts, caption: 'State of the ', cap:'Art Courts', des:'Train and compete on premium courts designed for performance, safety, and ultimate playing experience across all sports.' },
    { image: activity, caption: 'Dynamic Sports ',cap:"Activities", des:'Explore a variety of sports programs, tournaments, and events tailored for athletes of all levels to thrive and achieve goals.' }
  ];

  return (
    <div className="  my-7 rounded-xl overflow-hidden shadow-lg ">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full sm:h-[600px] h-[400px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full" style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(17, 17, 17, 0.6)),url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
             
              <div className="absolute sm:bottom-20 bottom-10 left-0 text-center  w-full bg-gray-800/50 bg-opacity-20  text-xl font-semibold p-4">
                <h2 className='text-2xl   sm:text-3xl lg:text-5xl font-bold text-secondary'>{slide.caption} <span className='text-green-200'>{slide.cap}</span></h2>
                <p className='text-sm  text-white py-4 '>{slide.des}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
