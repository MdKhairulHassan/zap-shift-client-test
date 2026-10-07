import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div>
      <h2>Payment is cancelled. Please try again</h2>
      <Link to="/dashboard/my-parcels">
        <button className="btn btn-primary text-black">View My Parcels</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
