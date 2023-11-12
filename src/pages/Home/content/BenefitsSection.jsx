import React from 'react'
import SubHeader from '../../../components/web/SubHeader'
import SubSectionHeader from '../../../components/web/SubSectionHeader'
import { BiLogoYoutube } from 'react-icons/bi'
import { RiAdvertisementFill } from 'react-icons/ri'

const BenefitsSection = () => {
  const YouTubebenefits = [
    'Boost Your Channel with Organic Views.',
    'Increase Subscribers and Engagement.',
    'Monetize Your Content on ZERP.'
  ]

  const AdvertiserBenefits = [
    "Advertise with ZERP's Engaged Audience.",
    'Reach a Targeted Audience.',
    'Flexible Advertising Packages.'
  ]

  const getBenefitsList = benefits => {
    return (
      <ul className='list-disc text-xl list-inside list-image-[url(https://img.icons8.com/color-glass/20/check-all--v1.png)]'>
        {benefits.map((benefit, index) => (
          <li key={index} className='mb-6 text-black/90'>{benefit}</li>
        ))}
      </ul>
    )
  }

  return (
    <div className='px-12'>
      <SubHeader>Benefits</SubHeader>
      <div className='flex flex-wrap pt-4'>
        <div className='w-full lg:w-1/2 flex justify-center flex-col items-center bg-red/10 rounded-xl py-6'>
          <SubSectionHeader
            icon={<BiLogoYoutube className='text-3xl text-red' />}
          >
            For YouTube Creators
          </SubSectionHeader>
          {getBenefitsList(YouTubebenefits)}
        </div>
        <div className='w-full lg:w-1/2 flex justify-center flex-col items-center rounded-xl py-6'>
          <SubSectionHeader
            icon={<RiAdvertisementFill className='text-3xl text-blue-500' />}
          >
            For Advertisers
          </SubSectionHeader>
          {getBenefitsList(AdvertiserBenefits)}
        </div>
      </div>
    </div>
  )
}

export default BenefitsSection
