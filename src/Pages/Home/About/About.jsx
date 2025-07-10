import React from 'react'
import history from '../../../assets/history.jpg'
import mission from '../../../assets/mission.jpg'
const About = () => {
  return (
    <section className=" text-gray-800 py-16 px-4 sm:px-6 lg:px-20"
    data-aos="fade-up"   
    >
      <div className="max-w-7xl mx-auto">
        {/* Title + Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-accent mb-4">
            About <span className='text-primary'>Our</span>  Club
          </h2>
          <p className="text-base text-accent/50 max-w-2xl mx-auto">
            Passion. Performance. Community. Discover what makes our club exceptional.
          </p>
        </div>

        {/* Content Grid */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* History */}
          <div className="bg-base-200 rounded-xl shadow-md p-8" 
          data-aos="fade-right"  
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">
            <h3 className="text-3xl font-bold text-secondary mb-4">Our <span className='text-green-200'>History</span></h3>
            <p className="text-gray-200 leading-relaxed text-justify">
              Established in 2010, our Sports Club began as a humble initiative by a few passionate individuals
              aiming to create a safe, inclusive, and competitive environment for sports lovers of all ages. 
              <br /><br />
              Over the years, we've expanded into a full-fledged facility, housing professional courts, training zones,
              and recreational areas. Thousands of members have participated in our local tournaments, fitness
              programs, and workshops, many going on to achieve remarkable milestones in regional and national sports events.
              <br /><br />
              With over a decade of continuous growth, we now serve as a hub where tradition meets innovation,
              celebrating both recreational fun and athletic excellence.
            </p>
          </div>
            <img src={history} alt="" className='rounded-xl'
            data-aos="fade-left"  
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"/>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-4">
            <img src={mission} alt="" className='rounded-xl'
            data-aos="fade-right"  
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"/>

          {/* Mission */}
          <div className="bg-base-200 rounded-xl shadow-md p-8 " 
          data-aos="fade-left" 
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">
            <h3 className="text-3xl font-bold text-secondary mb-4">Our <span className='text-green-200'>Mission</span></h3>
            <p className="text-gray-200 leading-relaxed text-justify">
              Our mission is to inspire and empower individuals through sports and physical activity, creating
              lifelong habits of wellness, teamwork, and discipline. We strive to:
            </p>
            <ul className="list-disc list-inside text-gray-200 mt-4 space-y-2">
              <li>Provide world-class facilities that foster both casual and professional training</li>
              <li>Encourage youth participation in healthy, structured, and inspiring programs</li>
              <li>Create a welcoming and inclusive environment for everyone regardless of age, background, or ability</li>
              <li>Host diverse events and tournaments that bring the community together</li>
              <li>Champion the values of sportsmanship, respect, and continuous personal growth</li>
            </ul>
            <p className="text-gray-200 leading-relaxed mt-4 text-justify">
              Whether you're a beginner looking to explore a new hobby or a seasoned athlete
              chasing new goals — our club is your home for excellence and belonging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;