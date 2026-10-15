import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import ClientWork from "@/components/home/ClientWork";
import Products from "@/components/home/Products";
import Process from "@/components/home/Process";
import Pricing from "@/components/home/Pricing";
import Faq from "@/components/home/Faq";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-clip">
        <Hero />
        <ClientWork />
        <Products />
        <Process />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
