
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Conservation = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Supporting Conservation Across East Africa</h2>
            <p className="mb-6 text-muted-foreground">
              At Dirt Trails Safaris, we believe in responsible tourism that benefits local communities and protects wildlife habitats. Through our Environmental Conservation Program, $50 from each booking goes directly to important conservation initiatives.
            </p>
            <p className="mb-8 text-muted-foreground">
              When you add our Tree Planting Program to your booking, you'll receive a certificate and tracking link to monitor the growth and impact of your contribution to reforestation efforts.
            </p>
            <Button asChild>
              <Link to="/about">Learn More About Our Efforts</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80" 
              alt="Conservation efforts"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Conservation;
