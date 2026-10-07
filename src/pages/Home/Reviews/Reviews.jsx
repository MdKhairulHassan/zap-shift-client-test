import { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);

  return (
    <div className="my-24">
      <div className="text-center mb-24 px-40">
        <h3 className="text-3xl font-bold text-center my-8">Review</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste eius
          soluta nobis fuga excepturi animi incidunt, libero nemo omnis optio
          necessitatibus eligendi non veniam tenetur vero in alias corporis
          nostrum?
        </p>
      </div>
      <>
        <Swiper
          loop={true}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 200,
            modifier: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map(review => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
