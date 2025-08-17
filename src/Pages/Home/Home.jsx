import React from 'react'
import Banner from './Banner/Banner'
import About from './About/About'
import Location from './Location/Location'
import Promotions from './Promotions/Promotions'
import Trainers from './Trainers/Trainers'
import Testimonials from './Testimonials/Testimonials'
import FAQs from './FAQs/FAQs'
import BlogSection from './BlogSection/BlogSection'

function Home() {
  return (
    <div>
      <Banner/>
      <div className='max-w-7xl mx-auto'>
        <About/>
      <Location/>
      <Trainers/>
      <Promotions/>
      <Testimonials/>
      <FAQs/>
      <BlogSection/>
      </div>
    </div>
  )
}

export default Home