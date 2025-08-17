import React from "react";
import { FaHistory, FaBullseye, FaLightbulb  } from "react-icons/fa";

const About = () => {
  return (
    <section className=" text-gray-800 py-16 px-4 sm:px-6 lg:px-20" data-aos="fade-up" data-aos-duration="2000">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="max-w-7xl mx-auto text-center mb-12" data-aos="fade-down" data-aos-duration="1000">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-accent dark:text-orange-400 mb-4">
            About <span className='text-primary dark:text-gray-300'>Our</span>  Club
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We are dedicated to making club and court management easy, efficient, and accessible for everyone.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* History Card */}
          <div
            className="bg-gradient-to-l from-accent to-accent/80  dark:bg-gradient-to-t dark:from-gray-800 dark:to-gray-900 rounded-bl-3xl rounded-tr-3xl text-white shadow-lg p-8 hover:scale-105 transition duration-300"
            data-aos="fade-up" data-aos-duration="1000"
          >
            <div className="flex items-center justify-center mb-4 text-5xl text-primary">
              <FaHistory />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">Our History</h3>
            <p className="text-sm leading-relaxed text-center">
              Founded in 2025 with the vision to digitalize club and court operations, we have grown to serve multiple institutions efficiently.
            </p>
          </div>

          {/* Mission Card */}
          <div
            className="bg-accent dark:bg-transparent dark:border rounded-3xl text-white shadow-lg p-8 hover:scale-105 transition duration-300"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex items-center justify-center mb-4 text-5xl text-secondary dark:text-green-300">
              <FaBullseye />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center ">Our Mission</h3>
            <p className="text-sm leading-relaxed text-center ">
              To empower students, members, and admins with a seamless platform for bookings, payments, and management in a single ecosystem.
            </p>
          </div>

          {/* Vision Card */}
          <div
            className="bg-gradient-to-r from-accent to-accent/80 dark:bg-gradient-to-t dark:from-gray-800 dark:to-gray-900 rounded-tl-3xl rounded-br-3xl text-white shadow-lg p-8 hover:scale-105 transition duration-300"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex items-center justify-center mb-4 text-5xl text-yellow-400">
              <FaLightbulb  />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center ">Our Vision</h3>
            <p className="text-sm leading-relaxed text-center">
              To be the leading digital platform simplifying event and facility management with innovative technology and design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
