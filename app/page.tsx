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
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { futureMedia } from "@/data/site";

export default function Page() {
  const showGallery = futureMedia.gallery.length > 0;
  const showVideo = Boolean(futureMedia.video);
  const showReviews = false;

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#2f2f2f]">
      <ScrollToTop />
      <Header />
      <main>
        <Hero />
        <Kako />
        <Ketering />
        <Ponuda />
        {showGallery && <Galerija />}
        {showVideo && <Video />}
        <Meni />
        {showReviews && <Recenzije />}
        <Onama />
        <Faq />
        <Kontakt />
      </main>
      <Footer />
    </div>
  );
}
