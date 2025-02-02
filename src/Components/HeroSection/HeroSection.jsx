import React from 'react'
import '../HeroSection/HeroSection.css'
import headerPic from '../../assets/headerBg.jpg'
const HeroSection = () => {
  return (
    <div className='hero-section' style={{ backgroundImage: `url(${headerPic})` }}>
      
      <h1>Have No Fear! The Beer is HERE!</h1>
    </div>
  )
}

export default HeroSection