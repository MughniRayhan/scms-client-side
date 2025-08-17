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
    <div className=" pt-12 mb-7 overflow-hidden shadow-lg ">
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
            <div className=' flex justify-center items-center pt-4 sm:px-20 px-8 place-items-center  md:justify-start h-[400px] sm:h-[650px] w-full' 
            style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 1, 0.9), rgba(17, 17, 17, 0.6)),url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
             
              <div className="flex flex-col justify-center items-center gap-4 ml-8 sm:pt-8  w-[90%] mx-auto  text-center  order-2 sm:order-1">
                <h2 className='text-2xl   sm:text-6xl lg:text-7xl font-bold text-secondary dark:text-green-400'>{slide.caption} <span className='text-green-200 '>{slide.cap}</span></h2>
                <p className='text-sm  text-white/80 py-4 lg:w-[50%]'>{slide.des}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
