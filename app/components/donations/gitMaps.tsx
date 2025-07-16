import { FaAmazon, FaAmazonPay, FaApple, FaSkiingNordic, FaUber, FaXbox } from 'react-icons/fa';
import {
  SiAmericanexpress, SiAsda, SiDhl, SiEbay, SiGoogleplay, SiLoom, SiMacys,
  SiNeovim as SiNeosurf, SiNetflix, SiNike, SiNintendo, SiPlaystation,
  SiRazer, SiRoblox, SiSepa, SiSteam, SiTarget, SiTesco, SiVisa, SiWalmart
} from 'react-icons/si';
import { CiBadgeDollar } from "react-icons/ci";
import { FaConfluence } from "react-icons/fa6";
import { GiCardPlay, GiMoneyStack, GiTicket } from 'react-icons/gi';
import { MdLocalGroceryStore, MdSportsBaseball } from 'react-icons/md';
import { BsGiftFill } from 'react-icons/bs';
import type { ReactNode } from 'react';

type GiftCardOption = {
  id: string;
  type: string;
  amounts: Array<number>;
};

export const cardOptions: Array<GiftCardOption> = [
  // Popular
  { id: 'amazon-physical', type: 'Amazon (Physical)', amounts: [25, 50, 100, 200, 500, 1000] },
  { id: 'amazon-ecode', type: 'Amazon (eCode)', amounts: [25, 50, 100, 200, 500, 1000] },
  { id: 'itunes-physical', type: 'iTunes/Apple (Physical)', amounts: [25, 50, 100, 200, 500] },
  { id: 'itunes-ecode', type: 'iTunes/Apple (eCode)', amounts: [15, 25, 50, 100, 200, 500] },
  { id: 'google-play', type: 'Google Play', amounts: [10, 25, 50, 100, 200] },
  { id: 'steam', type: 'Steam', amounts: [20, 50, 100, 200] },
  { id: 'visa', type: 'Visa', amounts: [25, 50, 100, 200, 500, 1000] },
  { id: 'ebay', type: 'eBay', amounts: [25, 50, 100, 200, 500] },
  { id: 'walmart', type: 'Walmart', amounts: [25, 50, 100, 200, 500] },
  { id: 'roblox', type: 'Roblox', amounts: [10, 25, 50, 100, 200] },
  { id: 'xbox', type: 'Xbox', amounts: [10, 25, 50, 100, 200] },
  { id: 'playstation', type: 'PlayStation', amounts: [10, 25, 50, 100, 200] },
  { id: 'netflix', type: 'Netflix', amounts: [30, 60, 100, 200] },

  // Retail
  { id: 'sephora', type: 'Sephora', amounts: [25, 50, 100, 250] },
  { id: 'footlocker', type: 'Foot Locker', amounts: [25, 50, 100, 200] },
  { id: 'macys', type: "Macy's", amounts: [25, 50, 100, 200] },
  { id: 'nordstrom', type: 'Nordstrom', amounts: [25, 50, 100, 200, 500] },
  { id: 'target', type: 'Target', amounts: [25, 50, 100, 200] },
  { id: 'nike', type: 'Nike', amounts: [25, 50, 100, 200] },
  { id: 'lululemon', type: 'Lululemon', amounts: [25, 50, 100, 200] },

  // Prepaid/Specialty
  { id: 'amex', type: 'American Express', amounts: [25, 50, 100, 200, 500, 1000] },
  { id: 'neosurf', type: 'Neosurf', amounts: [10, 25, 50, 100, 250] },
  { id: 'paysafecard', type: 'Paysafecard', amounts: [10, 25, 50, 100, 200] },
  { id: 'netspend', type: 'NetSpend', amounts: [25, 50, 100, 200, 500] },
  { id: 'joker', type: 'Joker Card', amounts: [25, 50, 100, 200] },
  { id: 'moneypak', type: 'US MoneyPak', amounts: [25, 50, 100, 200, 500] },
  { id: 'razer', type: 'Razer Gold', amounts: [10, 25, 50, 100, 200] },

  // US
  { id: 'us-uber', type: 'US Uber', amounts: [25, 50, 100, 200] },
  { id: 'us-nintendo', type: 'US Nintendo', amounts: [20, 35, 50, 100] },
  { id: 'us-fungames', type: 'US Fun & Games', amounts: [25, 50, 100, 200] },
  { id: 'us-dollar-general', type: 'US Dollar General', amounts: [25, 50, 100] },
  { id: 'us-coach', type: 'US Coach', amounts: [25, 50, 100, 200] },
  { id: 'us-dicks', type: 'US Dick\'s Sporting Goods', amounts: [25, 50, 100, 200] },
  { id: 'us-zillions', type: 'US ZillionsGifts', amounts: [25, 50, 100, 200] },
  { id: 'us-one4all', type: 'US one4all', amounts: [25, 50, 100, 200] },
  { id: 'us-a1o', type: 'US A1O', amounts: [25, 50, 100, 200] },

  // UK
  { id: 'uk-tesco', type: 'UK Tesco', amounts: [10, 25, 50, 100] },
  { id: 'uk-asda', type: 'UK ASDA', amounts: [10, 25, 50, 100] },
  { id: 'uk-home-depot', type: 'UK Home Depot', amounts: [10, 25, 50, 100] },
  { id: 'uk-love2shop', type: 'UK Love2shop', amounts: [10, 25, 50, 100] },

  // EUR / Intl
  { id: 'eur-nintendo', type: 'EUR Nintendo', amounts: [20, 35, 50, 100] },
  { id: 'eneba-germany', type: 'Eneba Germany', amounts: [10, 25, 50, 100] },
];

export const getCardIcon = (type: string): ReactNode => {
  const lowerType = type.toLowerCase();
  if (lowerType.includes('amazon')) return <FaAmazon className="w-5 h-5" />;
  if (lowerType.includes('apple') || lowerType.includes('itunes')) return <FaApple className="w-5 h-5" />;
  if (lowerType.includes('google')) return <SiGoogleplay className="w-5 h-5" />;
  if (lowerType.includes('steam')) return <SiSteam className="w-5 h-5" />;
  if (lowerType.includes('visa')) return <SiVisa className="w-5 h-5" />;
  if (lowerType.includes('ebay')) return <SiEbay className="w-5 h-5" />;
  if (lowerType.includes('walmart')) return <SiWalmart className="w-5 h-5" />;
  if (lowerType.includes('netflix')) return <SiNetflix className="w-5 h-5" />;
  if (lowerType.includes('roblox')) return <SiRoblox className="w-5 h-5" />;
  if (lowerType.includes('playstation')) return <SiPlaystation className="w-5 h-5" />;
  if (lowerType.includes('xbox')) return <FaXbox className="w-5 h-5" />;
  if (lowerType.includes('target')) return <SiTarget className="w-5 h-5" />;
  if (lowerType.includes('nike')) return <SiNike className="w-5 h-5" />;
  if (lowerType.includes('american express')) return <SiAmericanexpress className="w-5 h-5" />;
  if (lowerType.includes('paysafecard')) return <FaAmazonPay className="w-5 h-5" />;
  if (lowerType.includes('neosurf')) return <SiNeosurf className="w-5 h-5" />;
  if (lowerType.includes('tesco')) return <SiTesco className="w-5 h-5" />;
  if (lowerType.includes('asda')) return <SiAsda className="w-5 h-5" />;
  if (lowerType.includes('razer')) return <SiRazer className="w-5 h-5" />;
  if (lowerType.includes('uber')) return <FaUber className="w-5 h-5" />;
  if (lowerType.includes('nintendo')) return <SiNintendo className="w-5 h-5" />;
  if (lowerType.includes('lululemon')) return <SiLoom className="w-5 h-5" />;
  if (lowerType.includes('sephora')) return <SiSepa className="w-5 h-5" />;
  if (lowerType.includes('macy')) return <SiMacys className="w-5 h-5" />;
  if (lowerType.includes('dollar general')) return <CiBadgeDollar className="w-5 h-5" />;
  if (lowerType.includes('nordstrom')) return <FaSkiingNordic className="w-5 h-5" />;
  if (lowerType.includes('money') || lowerType.includes('moneypak')) return <GiMoneyStack className="w-5 h-5" />;
  if (lowerType.includes('joker')) return <GiCardPlay className="w-5 h-5" />;
  if (lowerType.includes('grocery')) return <MdLocalGroceryStore className="w-5 h-5" />;
  if (lowerType.includes('sport') || lowerType.includes('dick')) return <MdSportsBaseball className="w-5 h-5" />;
  if (lowerType.includes('fun & games')) return <GiTicket className="w-5 h-5" />;
  if (lowerType.includes('love2shop') || lowerType.includes('one4all')) return <BsGiftFill className="w-5 h-5" />;
  if (lowerType.includes('eneba')) return <SiDhl className="w-5 h-5" />;
  if (lowerType.includes('a1o')) return <GiMoneyStack className="w-5 h-5" />;
  if (lowerType.includes('zillions')) return <BsGiftFill className="w-5 h-5" />;
  if (lowerType.includes('coach')) return <FaConfluence className="w-5 h-5" />;

  if (type.startsWith('US ') || type.startsWith('UK ') || type.startsWith('EUR ')) {
    return <SiVisa className="w-5 h-5" />;
  }

  return <BsGiftFill className="w-5 h-5" />;
};
