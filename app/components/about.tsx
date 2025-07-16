import { 
  FaGlobeAmericas, 
  FaHandHoldingHeart, 
  FaHandsHelping 
} from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { MdOutlinePsychology } from "react-icons/md";

const About = () => {
  const weDo = [
    {
      name: 'Provide shelter and education for abandoned and orphaned children.',
      icon: <GiFamilyHouse size={40} className=" text-[#B23E3E]" />
    },
    {
      name: 'Offer private support services for individuals battling emotional or financial crises.',
      icon: <FaHandsHelping size={40} className=" text-[#B23E3E]" />
    },
    {
      name: 'Facilitate trauma counseling and mentorship programs.',
      icon: <MdOutlinePsychology size={40} className=" text-[#B23E3E]" />
    },
    {
      name: 'Empower local communities through outreach and donation drives.',
      icon: <FaHandHoldingHeart size={40} className=" text-[#B23E3E]" />
    },
    {
      name: 'Operate international branches focused on sustainable, local support systems.',
      icon: <FaGlobeAmericas size={40} className=" text-[#B23E3E]" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto z-20 md:px-12 px-3 py-8" id='mission'>
  <section className="mb-12">
  <h1 className="text-3xl font-bold mb-4 text-black">Our Mission</h1>

  <p className="text-lg leading-relaxed text-gray-700 text-start">
    At Children of Faith Homes, our mission is to create a nurturing environment where children in crisis can heal,
    grow, and prepare for a brighter future. We are committed to addressing the physical, emotional, educational,
    and spiritual needs of orphans and families facing hardships.
  </p>

  <p className="text-lg leading-relaxed text-gray-700 mt-4 text-start">
    Our core belief is that every child deserves love, protection, education, and a chance at life ,   no matter where
    they come from. Headquartered in Israel, our outreach extends globally, with active branches in Africa, Asia,
    and Latin America.
  </p>

  <p className="text-lg leading-relaxed text-gray-700 mt-4 text-start">
    We work tirelessly to provide safe shelter, nutritious meals, access to quality education, and mentorship that
    empowers each child to rise beyond their circumstances. Through faith-based care, we aim to restore hope,
    instill confidence, and raise leaders who will shape a better tomorrow.
  </p>

  <p className="text-lg leading-relaxed text-gray-700 mt-4 text-start">
    Whether through our on-ground programs, community support initiatives, or global donor partnerships, our
    commitment remains the same: to be a family to the forgotten, a voice for the voiceless, and a light in the
    darkness for every child who walks through our doors.
  </p>

  <p className="text-lg leading-relaxed text-gray-700 mt-4 text-start ">
    Our mission is not just to provide temporary relief, but to build long-term transformation,  turning trauma into
    triumph, scarcity into sufficiency, and despair into destiny. Every child we support carries with them the seed
    of greatness, and we are honored to help nurture it.
  </p>

  <p className="text-lg leading-relaxed text-gray-700 mt-4 text-start">
    We believe that when communities come together with compassion and action, change is inevitable. Your
    partnership ,   whether through prayer, sponsorship, volunteering, or donation ,   makes you an active part of
    the miracle unfolding in these young lives.
  </p>

  <p className="text-lg leading-relaxed text-gray-700 mt-4 text-start">
    Together, we can restore dignity, unlock dreams, and raise a generation of children filled with faith, purpose,
    and the power to impact the world around them.
  </p>
</section>



      <section>
        <h1 className="text-3xl font-bold mb-6 text-black">What We Do</h1>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 items-start">
          {weDo.map((itm, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow 
                         md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] h-[12rem] flex flex-col"
            >
              <div className="flex flex-col items-start gap-4">
                <div className="mt-1 flex items-center justify-center mx-auto ">{itm.icon}</div>
                <div>
                  <p className="text-lg  text-gray-700">{itm.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-lg italic text-gray-600 text-center">
          We are more than a charity. We are a home, a family, and a safe place for those who need us most.
        </p>
      </section>
    </div>
  );
};

export default About;
