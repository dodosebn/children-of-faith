'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';



const DeHeader = () => {
const chariDona = [
  {
    name: 'Gifts by Category',
    path: '/donate/allGift',
    image: '/donateRelated/alot-said.jpg',
  },
  {
    name: 'View All Gifts',
    path: '/donate/allGift',
    image: '/donateRelated/boys-smile.jpg',
  },
];

  return (
    <div className="text-center px-4 space-y-6 py-6 ">
      <h1 className="text-2xl md:text-4xl font-bold">
        CHARITABLE GIFTS THAT MAKE A DIFFERENCE
      </h1>

      {/* <h2 className="text-base md:text-lg text-gray-700">
        We accept gift cards and bank transfers from any country. Our partner banks operate across continents.
      </h2> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {chariDona.map((itm) => (
          <motion.section
            key={itm.name}
            whileHover={{ scale: 1.03 }}
            className="h-[250px] bg-cover bg-center flex items-center justify-center shadow-md text-white text-xl font-semibold"
            style={{ backgroundImage: `url(${itm.image})` }}
          >
            <Link href={itm.path} className="bg-black/60 px-4 py-2 rounded">
              {itm.name}
            </Link>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default DeHeader;
