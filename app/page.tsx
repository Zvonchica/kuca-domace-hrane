import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Kako from "@/components/Kako";
import Ponuda from "@/components/Ponuda";
import Ketering from "@/components/Ketering";
import Video from "@/components/Video";
import Galerija from "@/components/Galerija";
import Meni from "@/components/Meni";
import Recenzije from "@/components/Recenzije";
import Onama from "@/components/Onama";
import Faq from "@/components/Faq";
import Kontakt from "@/components/Kontakt";
import SocialStrip from "@/components/SocialStrip";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#2f2f2f]">
      
      {/* scroll fix */}
      <ScrollToTop />

      <Header />

      <main>
        <Hero />
        <Kako />
        <Ketering />
        <Ponuda />
        <Galerija />
        <Video />
        <Meni />
        <Recenzije />
        <Onama />
        <Faq />
        <Kontakt />
        <SocialStrip />
      </main>

      <Footer />
    </div>
  );
}