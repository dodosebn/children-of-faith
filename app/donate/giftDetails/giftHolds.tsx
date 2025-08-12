'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGiftDetails } from '@/app/stores/useGiftDetails';

export const GiftHolds = ({ item }: { item: any }) => {
  const setSelectedGift = useGiftDetails((state) => state.setSelectedGift);

  const handleClick = () => {
    setSelectedGift(item);
  };

  return (
    <Link
      href={`/donate/giftDetails/${item.id}`}
      onClick={handleClick}
      className="block group relative"
    >
      <div className="flex absolute z-10 top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 
        bg-black/70 text-white  p-2 w-full items-center justify-center
        md:opacity-0 md:group-hover:opacity-100 opacity-100 transition-opacity duration-300">
        <span className="text-xl font-semibold">Quick review</span>
      </div>

      <div className="bg-white border border-gray-300 overflow-hidden flex flex-col h-full w-full">
        <div className="relative w-full h-[300px]">
          <Image
            src={item.img}
            alt={item.heading}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h2 className="text-lg text-blue-800 font-semibold text-center mb-2">
            {item.heading}
          </h2>
          <div className="mt-auto border border-gray-300 text-gray-700 py-2 px-4">
            <p className="text-center font-semibold">{item.outerPrice}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
