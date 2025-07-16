import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loader from "../../../Components/Loader/Loader";

const Promotions = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetch coupons from database
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    }
  });

  if (isLoading) return <Loader />;

  return (
    <section
      className="bg-gradient-to-b from-base-200 via-base-200/70 to-base-200 text-white py-10 my-8 rounded-2xl"
      data-aos="zoom-in"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">
          🎉 Exclusive Promotions & Discount Coupons
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.slice(0, 6).map((coupon, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-primary to-orange-300 rounded-2xl text-center p-6 shadow-xl transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-xl font-extrabold mb-2 text-secondary">
                Save {coupon.discountPercentage}%!
              </h3>
              <p className="mb-4 text-gray-800">Use Code</p>
              <div className="bg-neutral rounded-lg px-4 py-2 text-lg font-mono tracking-widest">
                {coupon.code}
              </div>
            </div>
          ))}
          {coupons.length === 0 && (
            <p className="text-center text-gray-800 col-span-full">
              No promotions available right now.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
