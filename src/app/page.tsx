import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import ClientWork from "@/components/home/ClientWork";
import Products from "@/components/home/Products";
import Process from "@/components/home/Process";
import Engagement from "@/components/home/Engagement";
import Faq from "@/components/home/Faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-clip">
        <Hero />
        <Services />
        <ClientWork />
        <Products />
        <Process />
        <Engagement />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
