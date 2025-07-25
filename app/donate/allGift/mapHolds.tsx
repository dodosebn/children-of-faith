'use client';
import React from 'react';
import { GiftHolds } from '../giftDetails/giftHolds';
import { allGifts } from '@/app/utils/allCatMaps';

interface MapHoldsProps {
  data: typeof allGifts;
}

const MapHolds = ({ data }: MapHoldsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0">
      {data.map((item) => (
        <GiftHolds key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MapHolds;
