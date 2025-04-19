
import Hero from '@/components/home/Hero';
import ToursSection from '@/components/home/ToursSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Conservation from '@/components/home/Conservation';
import Testimonials from '@/components/home/Testimonials';
import CallToAction from '@/components/home/CallToAction';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ToursSection />
      <WhyChooseUs />
      <Conservation />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default HomePage;
