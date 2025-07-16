'use client';

import { useState } from "react";
import {AnimatePresence,  motion } from "framer-motion";
import testis from "../utils/testis";

const Testimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const testimonialsToShow = showAll ? testis : testis.slice(0, 3);

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 py-12" id='testis'>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-10 text-gray-900"
      >
        Testimonials
      </motion.h1>

      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {testimonialsToShow.map((itm, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
            >
              <blockquote className="text-gray-700 italic before:content-['\201C'] after:content-['\201D']">
                {itm.name}
              </blockquote>
              <cite className="block text-sm font-medium text-[#B23E3E] mt-4 not-italic">
                {itm.title}
              </cite>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.section>

      <div className="flex justify-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 bg-[#B23E3E] text-white font-medium rounded-md shadow hover:bg-[#9a3434] transition-colors"
          aria-expanded={showAll}
          aria-label={showAll ? "Show fewer testimonials" : "Show more testimonials"}
        >
          {showAll ? "Show Less" : "See More"}
        </motion.button>
      </div>
    </div>
  );
};

export default Testimonials;
