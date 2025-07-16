import React from "react";
import { FaTicketAlt, FaFutbol, FaBasketballBall } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { Link } from "react-router";

const Promotions = () => {
  const coupons = [
    { code: "SUMMER20", discount: "20%"},
    { code: "SPORT10", discount: "10%"},
    { code: "CLUB20", discount: "20%"},
  ];
  
  return (
    <section className="bg-gradient-to-b from-base-200 via-base-200/70 to-base-200 text-white py-10 my-8 rounded-2xl" data-aos="zoom-in">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          🎉 Exclusive Promotions & Discount Coupons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-primary to-orange-300 rounded-2xl text-center p-6 shadow-xl transform hover:scale-105 transition duration-300"
            >
               
              <h3 className="text-xl font-extrabold mb-2 text-secondary">
                Save {coupon.discount}!
              </h3>
              <p className="mb-4 text-gray-800">Use Code</p>
              <div className="bg-neutral rounded-lg px-4 py-2 text-lg font-mono tracking-widest">
                {coupon.code}
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
