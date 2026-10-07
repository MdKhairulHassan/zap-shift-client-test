const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;
  return (
    <div className="card bg-base-100 w-96 drop-shadow-2xl my-2 shadow-sm">
      <figure>
        <img src={user_photoURL} alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{userName}</h2>
        <p>{testimonial}</p>
        <div className="card-actions justify-between items-center pt-3">
          {/* Avatar */}
          <div className="h-16 w-16 shrink-0 rounded-full">
            <img
              src={user_photoURL}
              alt="user-photo"
              className="rounded-full"
            />
          </div>
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
