import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get('session_id');
  const axiosSecure = useAxiosSecure();

  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log('Payment success response:', res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-500">payment successful</h2>
      <p>Your parcel Transaction ID: {paymentInfo?.transactionId}</p>
      <p>Your parcel Tracking ID: {paymentInfo?.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
