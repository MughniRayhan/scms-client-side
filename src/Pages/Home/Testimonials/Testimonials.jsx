import React from 'react'

const Testimonials = () => {
  const reviews = [
    { name: "Alice", feedback: "Great facilities and friendly staff!", rating: 5 },
    { name: "Bob", feedback: "Loved the booking system, very convenient.", rating: 4 },
    { name: "Clara", feedback: "The trainers are amazing and professional.", rating: 5 },
  ];

  return (
    <section className="py-16 " data-aos="fade-up" data-aos-duration="1000">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-primary mb-2 dark:text-white">What Our <span className='text-accent  dark:text-orange-400'>Members</span> Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-5">
              <p className="text-gray-700 mb-4 dark:text-gray-300">&quot;{review.feedback}&quot;</p>
              <h4 className="font-semibold">{review.name}</h4>
              <p className="text-yellow-400">{'⭐'.repeat(review.rating)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default Testimonials