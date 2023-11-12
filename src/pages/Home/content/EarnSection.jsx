import React from 'react'
import SubHeader from '../../../components/web/SubHeader'

const EarnSection = () => {
  const earnings = [
    {
      title: 'Watch Videos',
      description:
        'Watch videos and earn ZERP. You can watch videos from any category.',
      image: '/images/stock/photo-1559703248-dcaaec9fab78.jpg'
    },
    {
      title: 'Subscribe to Channels',
      description:
        'Emphasize that users must subscribe to YouTube channels to earn points while watching videos.',
      image: '/images/stock/photo-1559703248-dcaaec9fab78.jpg'
    },
    {
      title: 'Referral System',
      description:
        'Mention the referral system, where users can earn even more rewards by referring others to ZERP.',
      image: '/images/stock/photo-1559703248-dcaaec9fab78.jpg'
    },
    {
      title: 'Withdraw Earnings',
      description:
        'Describe how users can withdraw their earnings to their TRC20 wallets once they reach the minimum withdrawal limit.',
      image: '/images/stock/photo-1559703248-dcaaec9fab78.jpg'
    }
  ]
  return (
    <div className='px-12 h-screen py-[3rem]'>
      <SubHeader>
        How Users Can Earn with <span className='text-red'>ZERP</span>
      </SubHeader>
      <div className='flex flex-wrap justify-between'>
        {earnings.map((item, idx) => (
          <div class='card w-96 glass' key={idx}>
            <figure>
              <img
                src='https://st2.depositphotos.com/3215151/10011/i/450/depositphotos_100111224-stock-photo-cg-render-of-generic-luxury.jpg'
                alt='car!'
              />
            </figure>
            <div class='card-body'>
              <h2 class='card-title'>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EarnSection
