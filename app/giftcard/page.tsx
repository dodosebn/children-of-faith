import React from 'react'
import Cheader from '../components/cHeader';
import GiftCardDonateForm from '../components/donations/giftcardDonationForm';
import Footer from '../components/footer';
const page = () => {
  return (
    <div className='overflow-x-hidden h-screen'>
            <Cheader />
      <GiftCardDonateForm />
                    <Footer />

    </div>
  )
}

export default page
