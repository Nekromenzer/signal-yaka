import React from 'react'
import HeroSection from './content/HeroSection'
import BenefitsSection from './content/BenefitsSection'
import EarnSection from './content/EarnSection'

const Home = () => {
  return (
    <div className='flex flex-col gap-[4rem] xl:gap-[8rem]'>
      {/* hero section */}
      <HeroSection />
      {/* benefits */}
      <BenefitsSection />
      {/* earn*/}
      <EarnSection />
    </div>
  )
}

export default Home
