import Image from "next/image";
import Header from "./components/header";
import ImgShowComp from "./components/imgShow";
import About from "./components/about";
import Testimonaires from "./components/testimonaires";
import HelpInt from "./components/helpInt";
import Footer from "./components/footer";

export default function Home() {
  return (
  <div className="text-center">
      <main className='overflow-x-hidden h-screen'>
        <Header />
       <ImgShowComp />
       <About />
       <Testimonaires />
       <HelpInt />
          <Footer />

       </main>
    </div>
  );
}
