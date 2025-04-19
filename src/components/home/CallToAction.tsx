
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-safari-green text-white">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your African Adventure?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Contact our team to start planning your perfect East African journey today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="outline" className="bg-white text-safari-green border-white hover:bg-transparent hover:text-white" asChild>
            <Link to="/tours">Browse Tours</Link>
          </Button>
          <Button size="lg" className="bg-safari-orange hover:bg-safari-orange/90 text-white" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
