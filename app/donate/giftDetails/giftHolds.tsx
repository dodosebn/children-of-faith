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
  <div className="absolute inset-0 z-10 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
