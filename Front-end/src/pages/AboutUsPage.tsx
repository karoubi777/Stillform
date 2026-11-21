import AboutHero from "../components/about-us/AboutHero";
import AboutServices from "../components/about-us/AboutServices";
import ContactConcerns from "../components/about-us/ContactConcerns";

export default function AboutUsPage() {
  return (
    <main className="w-full bg-white flex flex-col">
      {/* 1. Intro Hero Section with Counters */}
      <AboutHero />

      {/* 2. Services Section with Arched Team Photo */}
      <AboutServices />

      {/* 3. Concerns Contact Form Section */}
      <ContactConcerns />
    </main>
  );
}
