import React from 'react'
import Banner from './Banner/Banner'
import About from './About/About'
import Location from './Location/Location'
import Promotions from './Promotions/Promotions'

function Home() {
  return (
    <div>
      <Banner/>
      <About/>
      <Location/>
      <Promotions/>
    </div>
  )
}

export default Home