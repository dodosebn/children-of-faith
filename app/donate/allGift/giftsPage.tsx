'use client';

import React, { useState, useMemo } from 'react';
import MapHolds from './mapHolds';
import { allGifts } from '@/app/utils/allCatMaps';

const GiftsPage = () => {
  const [selectedRange, setSelectedRange] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRange(e.target.value);
  };

  const filteredGifts = useMemo(() => {
    if (!selectedRange) return allGifts;

    const cleaned = selectedRange.replace(/\$/g, '').replace(/,/g, '');
    const [minStr, maxStr] = cleaned.replace('+', '').split('-');
    const min = parseInt(minStr.trim(), 10);
    const max = maxStr ? parseInt(maxStr.trim(), 10) : Infinity;

    return allGifts.filter((item) => {
      const price = parseInt(item.outerPrice.replace(/\$/g, '').replace(/,/g, ''), 10);
      return price >= min && price <= max;
    });
  }, [selectedRange]);

  return (
    <div className="max-w-none sm:max-w-7xl mx-auto px-0 sm:px-4 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 md:gap-4 px-4 sm:px-0">
        <h1 className="text-4xl font-bold text-gray-700 tracking-tight">
          🎁 View All Gifts
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <label htmlFor="price-filter" className="text-md font-semibold text-gray-700">
            Filter by Price:
          </label>
          <select
            id="price-filter"
            value={selectedRange}
            onChange={handleFilterChange}
            className="block w-48 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          >
            <option value="">All Prices</option>
            {/* <option value="$0 - $90">$0 - $90</option> */}
            <option value="$100 - $900">$100 - $900</option>
            <option value="$1000+">$1000+</option>
          </select>
        </div>
      </div>

      <MapHolds data={filteredGifts} />
    </div>
  );
};

export default GiftsPage;
