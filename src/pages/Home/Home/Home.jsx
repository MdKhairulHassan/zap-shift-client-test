import Banner from '../Banner/Banner';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';

// always keep '/' when fetching from public folder, otherwise it will not work in production build. like this: fetch('/reviews.json') instead of fetch('reviews.json').
const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Brands></Brands>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
    </div>
  );
};

export default Home;
