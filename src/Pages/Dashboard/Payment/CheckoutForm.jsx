import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import UseAuth from '../../../Hooks/UseAuth';
import Loader from '../../../Components/Loader/Loader';

const CheckoutForm = () => {
  const { id } = useParams(); 
  const {user} = UseAuth()
  const axiosSecure = UseAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Fetch booking data using TanStack Query
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  // Create payment intent when booking is loaded
  useEffect(() => {
    if (booking) {
      setFinalPrice(booking.price); // default price

      axiosSecure.post('/create-payment-intent', { price: booking.price })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(err => console.error(err));
    }
  }, [booking, axiosSecure]);

  // Apply coupon logic
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error('Please enter a coupon code');
      return;
    }

    axiosSecure.get(`/coupons/${couponCode}`)
      .then(res => {
       
          const discount = res.data.discountPercentage;
          const discountedPrice = booking.price - (booking.price * discount / 100);
          setFinalPrice(discountedPrice);
          setAppliedCoupon(discount);
          toast.success(`Coupon applied! ${discount}% off`);
        } ).catch(() => toast.error('Invalid coupon'));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements) return;

  setIsProcessing(true); // start loading

  const card = elements.getElement(CardElement);

  const { paymentMethod, error } = await stripe.createPaymentMethod({
    type: 'card',
    card
  });

  if (error) {
    toast.error(error.message);
    setIsProcessing(false);
    return;
  }

  const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethod.id
  });

  if (confirmError) {
    toast.error(confirmError.message);
    setIsProcessing(false);
    return;
  }

  if (paymentIntent.status === 'succeeded') {
    // Save payment info to DB
    const paymentData = {
      userEmail: booking.userEmail,
      courtType: booking.courtType,
      slots: booking.slots,
      date: booking.date,
      price: finalPrice,
      transactionId: paymentIntent.id,
      paymentDate: new Date(),
      bookingId: booking._id
    };

    try {
      await axiosSecure.post('/payments', paymentData);
      
      // Confirm booking status here
      await axiosSecure.patch(`/bookings/confirm/${booking._id}`);

      toast.success('Payment successful and booking confirmed!');
      setIsPaid(true); // disable button after payment
    } catch (err) {
      console.error(err);
      toast.error('Failed to store payment or confirm booking');
    }
  }

  setIsProcessing(false); // stop loading
};


  if (isLoading) return <Loader/>;

  return (
    <form onSubmit={handleSubmit} className=" w-[80%] mx-auto mt-10  bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>

      {/* Coupon code field */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="button" className="btn btn-secondary" onClick={handleApplyCoupon}>
          Apply
        </button>
      </div>

   <div className='flex flex-col md:flex-row justify-between  gap-3 w-full'>
       {/* Booking info fields */}
     <div className='w-full'>
         <div>
        <label>Email:</label>
        <input type="text" value={booking.userEmail} readOnly className="input input-bordered w-full" />
      </div>

      <div>
        <label>Court Type:</label>
        <input type="text" value={booking.courtType} readOnly className="input input-bordered w-full" />
      </div>

      <div>
        <label>Slots:</label>
        <input type="text" value={booking.slots.join(', ')} readOnly className="input input-bordered w-full" />
      </div>

      <div>
        <label>Date:</label>
        <input type="text" value={booking.date} readOnly className="input input-bordered w-full" />
      </div>

      <div>
        <label>Price:</label>
        <input type="text" value={`$${finalPrice}`} readOnly className="input input-bordered w-full" />
        {appliedCoupon && <p className="text-green-600">Coupon applied: {appliedCoupon}% off</p>}
      </div>

     </div>
      {/* Card input */}
      <div className='w-full md:bg-[#FAFDF0] md:p-4'>
        <div>
        <label>Card Details:</label>
        <CardElement className="border p-2 rounded" />
      </div>

      <button type="submit" disabled={!stripe || isProcessing || isPaid}
   className="btn btn-primary w-full mt-4 flex justify-center items-center">
  {isProcessing ? (
    <span className="loading loading-spinner"></span>
  ) : isPaid ? (
    'Payment Done'
  ) : (
    `Pay $${finalPrice}`
  )}
</button>

      </div>
   </div>
    </form>
  );
};

export default CheckoutForm;
