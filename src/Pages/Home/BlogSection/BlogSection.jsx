import React from 'react'

const BlogSection = () => {
    const achievements = [
    {
      year: "2023",
      title: "Best Sports Club Award",
      description: "Recognized for excellence in promoting community sports and fitness."
    },
    {
      year: "2022",
      title: "National Tennis Championship",
      description: "Our club hosted the national-level tennis tournament with 500+ participants."
    },
    {
      year: "2021",
      title: "Top Rated Facility",
      description: "Ranked as the #1 local sports facility by Sports Magazine."
    },
    {
      year: "2020",
      title: "Community Engagement Award",
      description: "Awarded for outstanding contribution to youth sports programs."
    },
  ];

  

  return (
      <section className="py-16 bg-white dark:bg-gray-800" data-aos="fade-up" data-aos-duration="1000">
      <div className="max-w-6xl mx-auto px-4">
         <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-primary  mb-2 dark:text-white">Our <span className='text-accent dark:text-orange-400'>Achievements</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="p-6 border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={idx * 100}
            >
              <h3 className="text-xl font-semibold text-accent">{item.year} – {item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default BlogSection