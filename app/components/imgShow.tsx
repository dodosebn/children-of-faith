'use client';

import { useEffect, useState } from 'react';
import { FaAngleRight, FaWhatsapp } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const HeroTextSwitcher = ({ textOptions }: { textOptions: Array<string> }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % textOptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [textOptions.length]);

  return (
    <div className="relative w-full text-[#FAA45B] font-extrabold text-[40px] md:text-[95px]
     leading-tight h-[80px] md:h-[120px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute w-full text-start mt-3 md:mt-0"
        >
          {textOptions[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ImgShowComp = () => {
  const imgers = ['/homeimg/img1.png', '/homeimg/img3.jpg'];
  const textOptions = ['Brighter Days', 'Safe Shelter', 'Lasting Love'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imgers.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
 const routers = [
    // {name: 'Home', href: '/'},
    { name: 'Our Mission', href: '#mission' },
    { name: 'How You can Help?', href: '#wedo' },
    { name: 'Testimonials', href: '#testis' },
  ];
  return (
    <section>
      <div className="relative w-screen">
        {/* Background */}
        {imgers.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 object-cover ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100 animate-zoom-forward' : 'opacity-0 scale-110'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-black/70 z-10" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto z-20 md:px-12 px-3 pt-20 md:pt-0 h-full flex flex-col justify-start text-left cursor-pointer text-white">
          <nav className="md:flex hidden justify-between items-center border-b border-white/30 py-5 w-full">
            <motion.div
              className="text-2xl font-black"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              Children of Faith Homes & Private Help Services
            </motion.div>

            <ul className="flex space-x-4 text-sm font-medium">
              {routers.map((item) => (
                <Link href={item.href} key={item.href}>
                <li  className="text-[14px] font-bold capitalize">
                  {item.name}
                </li>
                </Link>
              ))}
            </ul>

            <a
              href="https://wa.me/14703903270"
              target="_blank"
              rel="noopener noreferrer"
              className="flex space-x-3 items-center"
            >
              <FaWhatsapp className="text-green-700" size={35} />
              <div>
                <h1 className="text-[13px] font-bold">Whatsapp</h1>
              </div>
            </a>
          </nav>

          {/* Animated Heading & Text */}
          <div className="flex flex-col items-start relative bottom-9 2xl:bottom-3">
            <h1 className="md:text-[95px] text-[40px] font-extrabold capitalize relative top-5 md:top-0">
              Hope for Children
            </h1>

            <HeroTextSwitcher textOptions={textOptions} />

            <div className="relative md:-translate-y-1 translate-y-3 flex flex-col items-start">
              <p className="text-[18px] text-[#FFFFFFB3] max-w-xl">
                Bringing hope, healing, and long-term care to orphans and vulnerable communities across the world.
              </p>
              <div className="flex gap-7 pt-6 justify-start">
                <Link href="/donate">
                  <button className="bg-white gap-4 flex items-center text-[#B23E3E] font-bold px-4 py-3 rounded-sm transition-all duration-300 transform hover:scale-105 group">
                    <div className="relative h-6 overflow-hidden">
                      <div className="transition-transform duration-800 ease-in-out group-hover:-translate-y-6">
                        <span className="block h-6">Donate Now</span>
                        <span className="block h-6">Sponsor Us</span>
                      </div>
                    </div>
                    <FaAngleRight className="text-lg" />
                  </button>
                </Link>

                <a
                  href="https://wa.me/14703903270"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex space-x-3 items-center"
                >
                  <FaWhatsapp className="text-green-700" size={35} />
                  <div>
                    <h1 className="text-[13px] font-bold">Whatsapp</h1>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImgShowComp;
