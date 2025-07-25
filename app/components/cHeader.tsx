'use client';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { CiLocationOn } from 'react-icons/ci';
import { FaEnvelope } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import type { Variants } from 'framer-motion';
import Link from 'next/link';
import Button from '../utils/button';

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.7 },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.4 },
  },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const routers = [
    {name: 'Home', href: '/'},
    { name: 'Our Mission', href: '/#mission' },
    { name: 'How You can Help?', href: '/#wedo' },
    { name: 'Testimonials', href: '/#testis' },
  ];
  return (
    <div className="bg-[#f5f5f5] px-4">
      {/* Desktop Header */}
      <div className="hidden md:block max-w-7xl mx-auto md:px-12">
        <div className="py-7">
          <div className="flex justify-between">
            <div className="flex flex-row space-x-5 items-stretch">
              {/* Location */}
             <Link href='/' className='text-3xl'>Home</Link>

              {/* Divider */}
              <div className="relative mx-4">
                <div className="absolute top-0 bottom-0 h-[9rem] left-1/2 w-[0.5px] bg-gray-400/40 transform -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Email */}
              <a
                href="mailto:fidelityxpresspayment@gmail.com?subject=Support%20for%20Orphanage%20and%20Help%20Services&body=Hello,%0D%0A%0D%0AI’m reaching out regarding support or help services.%0D%0A%0D%0AWhatsApp Contact: +14703903270%0D%0A%0D%0AThank you."
                className="flex space-x-2 items-center"
              >
                <FaEnvelope className="text-[#ae6a5e]" size={30} />
                <div className="flex flex-col items-start">
                  <h1 className="text-[#002C5F] text-[15px] font-bold">Email</h1>
                  <p className="text-[#002C5FCC] text-[13px]">Information center</p>
                </div>
              </a>
            </div>

            {/* Title & Donate Button */}
            <div className="flex justify-center items-center gap-7">
              <h1 className="text-2xl font-black inline-block">
                Children of Faith Homes & Private Help Services
              </h1>
              <Button />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="relative flex flex-col md:hidden w-full">
        {/* Top Bar */}
        <div className="flex justify-between items-center py-3 px-4 w-full">
          <img
            src="/logo.png"
            alt="Children of Faith Homes logo"
            className="w-16 h-16 object-contain"
          />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <IoClose size={28} className="text-[#002C5F]" />
            ) : (
<Menu size={28} className="text-[#002C5F] transform rotate-90" />
            )}
          </button>
        </div>

        {/* Scrolling Title */}
        <div className="w-full overflow-hidden">
          <motion.div
            className="whitespace-nowrap"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{
              repeat: Infinity,
              duration: 15,
              ease: 'linear',
            }}
          >
            <h1 className="text-lg font-bold text-[#002C5F] inline-block px-2 py-2">
              Children of Faith Homes & Private Help Services
            </h1>
          </motion.div>
        </div>

        {/* Slide Down Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Background Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/30 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Dropdown Panel */}
              <motion.div
                className="fixed top-0 left-0 right-0 bg-white z-50 w-full p-4 shadow-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {/* Close Button */}
                <div className="flex justify-end mb-2">
                  <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                    <IoClose size={24} className="text-[#002C5F]" />
                  </button>
                </div>

                {/* Navigation Links */}
                <motion.ul
                  className="flex flex-col items-center text-sm font-medium divide-y divide-gray-100 mb-6"
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {routers.map((item) => (
                    <motion.li key={item.href} variants={itemVariant}>
                      <Link
                        href={item.href}
                        key={item.href}
                        className="block px-4 py-4 text-[15px] font-semibold text-[#000] transition-colors"
                        // activeProps={{ className: 'text-[#000]' }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}

                  {/* Contact Info */}
                  <motion.li className="px-4 grid grid-cols-2 gap-4 mt-4" variants={itemVariant}>
                    <div className="flex items-start space-x-2">
                      <CiLocationOn className="text-[#f19383] mt-1" size={20} />
                      <div>
                        <p className="text-[#002C5F] text-[14px] font-bold">Israel HQ</p>
                        <p className="text-[#002C5FCC] text-[12px]">Visit Our site</p>
                      </div>
                    </div>

                    <a
                      href="mailto:Childrenoffaithhomes@gmail.com"
                      className="flex items-start space-x-2"
                    >
                      <FaEnvelope className="text-[#ae6a5e] mt-1" size={18} />
                      <div>
                        <p className="text-[#002C5F] text-[14px] font-bold">Email Us</p>
                        <p className="text-[#002C5FCC] text-[12px]">Information center</p>
                      </div>
                    </a>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Header;