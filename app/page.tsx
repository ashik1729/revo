import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductsServices from "@/components/ProductsServices";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <ProductsServices />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
