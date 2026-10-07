import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      parcelId: parcel?._id,
      cost: parcel?.cost,
      senderEmail: parcel?.senderEmail,
      parcelName: parcel?.parcelName,
      parcelType: parcel?.parcelType,
    };
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    console.log('Payment response:', res.data);

    window.location.href = res.data.url; // Redirect to Stripe checkout page
    // window.location.assign(res.data.url);
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }
  return (
    <div>
      <h2>Payment Type: {parcel?.parcelType}</h2>
      <p>Parcel ID: {parcelId}</p>
      <div>
        <h3>Parcel Details</h3>
        <p>Name: {parcel?.parcelName}</p>
        <p>Type: {parcel?.parcelType}</p>
        <p>Cost: ${parcel?.cost}</p>
      </div>
      <button className="btn btn-primary text-black" onClick={handlePayment}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Payment;
