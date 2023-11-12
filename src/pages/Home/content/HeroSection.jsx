import React from 'react'
import { Image } from 'antd'
import { Link } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import logo from '../../../img/logo.png'

const menuItems = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/dashboard'
  },
  {
    name: 'Services',
    path: '/services'
  },
  {
    name: 'Login',
    path: '/login'
  },
  {
    name: 'Contact',
    path: '/contact'
  }
]

const HeroSection = () => {
  return (
    <div className='h-screen px-4 lg:px-8 xl:px-16 xl:pt-4 bg-cover bg-hero'>
      <div className='flex justify-between items-center gap-4 xl:gap-16 h-[6rem]  w-full z-50'>
        <Image src={logo} width='8rem' preview={false} />
        <div className='hidden lg:block mr-auto'>
          <div className='flex gap-8 items-center justify-star'>
            {menuItems.map((item, index) => (
              <div className='self-start' key={index}>
                <Link
                  to={item.path}
                  className='text-lg font-semibold text-navy hover:text-red tracking-wider'
                  key={index}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div>
          <BiMenu className='text-3xl cursor-pointer hover:text-red' />
        </div>
      </div>
      <div className='flex flex-wrap '>
        <div className='w-full lg:w-1/2 xl:pt-[6rem] xl:pr-[10rem]'>
          {/* do not change word spacing in following text */}
          <h1 className='text-[3rem] xl:text-[4rem] font-bold tracking-wide whitespace-pre-wrap leading-[4rem] lg:leading-[5rem] mb-5 xl:mb-8 text-black/90'>
            Unlock Earnings with ZERP - For Creators and Advertisers
          </h1>
          <div className='tracking-wide text-black/80 font-semibold break-words xl:pr-8 text-[1.5rem]'>
            Earn Rewards by Watching Videos | Advertise with Us | Boost Your
            YouTube Channel.
          </div>
          <div className='rounded-[2rem] w-[12rem] bg-red text-white font-semibold text-center px-4 py-3 cursor-pointer hover:shadow shadow-red mt-8 xl:mt-[4rem] border-double border'>
            GET STARTED
          </div>
        </div>
        <div className='w-full lg:w-1/2'>
          <Image
            src='/src/img/hero-girl.png'
            preview={false}
            width='30rem'
            className='mt-[5.6rem] ml-[8rem]'
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
