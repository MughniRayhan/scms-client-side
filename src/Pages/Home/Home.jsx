import React from 'react'
import Banner from './Banner/Banner'
import About from './About/About'
import Location from './Location/Location'
import Promotions from './Promotions/Promotions'

function Home() {
  return (
    <div>
      <Banner/>
      <div className='max-w-7xl mx-auto'>
        <About/>
      <Location/>
      <Promotions/>
      </div>
    </div>
  )
}

export default Home