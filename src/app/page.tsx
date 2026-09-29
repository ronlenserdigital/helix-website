import Hero from "@/components/hero";
import {
  TrustStrip,
  Stats,
  Problem,
  ServicesGrid,
  Process,
  Proof,
  Founders,
  HomeCompare,
  PricingCards,
  Guarantee,
  Faq,
  CtaBand,
} from "@/components/sections";
import { FaqJsonLd } from "@/components/json-ld";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Stats />
      <Problem />
      <ServicesGrid />
      <Process />
      <Proof />
      <Founders />
      <HomeCompare />
      <PricingCards />
      <Guarantee />
      <Faq />
      <CtaBand />
      <FaqJsonLd />
    </>
  );
}
