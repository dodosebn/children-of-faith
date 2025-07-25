'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import { useGiftDetails } from '@/app/stores/useGiftDetails';
import { allGifts } from '@/app/utils/allCatMaps';
import Header from '@/app/components/cHeader';

type GiftDetailsParams = {
  params: Promise<{ id: string }>;
};

const GiftDetailsPage = ({ params: paramsPromise }: GiftDetailsParams) => {
  const { id } = use(paramsPromise); 
  const giftId = parseInt(id);
  const [exactPayment, setExactPayment] = useState('');
  const { selectedGift, getGiftById } = useGiftDetails();

  const gift =
    selectedGift?.id === giftId
      ? selectedGift
      : getGiftById(giftId) ?? allGifts.find((g) => g.id === giftId);

  if (!gift) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600">Gift not found.</p>
      </div>
    );
  }

  const whatsappMessage = `Hey, I'm reaching out because I want to support ${gift.heading} with $${exactPayment || gift.outerPrice}`;

  return (
    <>
    <Header />
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white overflow-hidden">
          <div className="relative h-96">
            <Image 
              src={gift.img} 
              alt={gift.heading} 
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold text-blue-800 text-center border-b border-gray-200 pb-2 mb-4">
              {gift.heading}
            </h1>
            <div className=" text-black/80 p-4 rounded-lg">
              <p className="text-center text-lg font-medium mb-2">
                {gift.outerPrice}
              </p>
              <div 
                className="max-w-none" 
                dangerouslySetInnerHTML={{ __html: gift.InnerMessage }} 
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6">
          <h2 className="text-xl font-bold mb-6 text-center">Make a Donation</h2>
          
          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Custom Amount
              </label>
              <input
                type="number"
                id="custom-amount"
                value={exactPayment}
                onChange={(e) => setExactPayment(e.target.value)}
                placeholder="e.g. 75"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <a
              href={`https://wa.me/14703903270?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md text-center transition-colors duration-200"
            >
              Continue on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default GiftDetailsPage;
