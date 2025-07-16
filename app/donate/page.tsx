import React from 'react'
import Cheader from '../components/cHeader';
import DeHeader from '../components/donations/deHeader';
import GiftCardOptions from '../components/donations/giftCardOptions';
import Footer from '../components/footer';
const page = () => {
  return (
 <div className='overflow-x-hidden h-screen'>
            <Cheader />
    <DeHeader />
    < GiftCardOptions />
              <Footer />

    </div>
  )
}

export default page
