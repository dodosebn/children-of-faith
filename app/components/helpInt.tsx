'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const HelpInt = () => {
  const text = "Your small act can become a child's lifeline. Get involved today. ";

  const helpMap = [
    {
      id: 1,
      name: 'Sponsor a vulnerable child or an entire family in need to create lasting change and opportunity',
      path: '/donate',
      color: 'bg-black text-white',
    },
    {
      id: 2,
      name: 'Make a generous one-time or recurring donation to support food, shelter, healthcare, and education',
      path: '/donate',
      color: 'bg-[#B23E3E] text-white',
    },
    {
      id: 3,
      name: 'Spread awareness by sharing our mission online and being a voice for vulnerable children worldwide',
      path: '/donate',
      color: 'bg-black text-white',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-12" id="wedo">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-12 text-gray-800"
      >
        How You Can Help
      </motion.h1>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-3"
      >
        {helpMap.map((itm) => (
          <motion.div
            key={itm.id}
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
            <Link href={itm.path}             key={itm.id}
 className="block h-full">
              <div
                className={`h-full p-6 transition-all duration-300 group-hover:shadow-lg ${itm.color}`}
              >
                <h3 className="text-xl font-semibold mb-2">{itm.name}</h3>
                <div className="mt-4 text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.section>

      {/* Seamless Marquee Banner */}
      <div className="w-full mt-10 bg-amber-500 overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: 'linear',
          }}
        >
          <span className="px-4">{text.repeat(3)}</span>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpInt;
