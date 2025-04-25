import { Leaf, Recycle, Award, Star } from 'lucide-react';

const ImpactSummary = () => {
  return (
    <section className="bg-safari-green/5 py-3 border-b border-safari-green/10 hidden md:block">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 lg:gap-12 text-gray-700">
          <div className="flex items-center">
            <Leaf className="h-5 w-5 mr-2 text-safari-green" />
            <span className="text-sm">
              <strong className="font-bold text-safari-green">765</strong> trees planted
            </span>
          </div>
          
          <div className="flex items-center">
            <Recycle className="h-5 w-5 mr-2 text-safari-green" />
            <span className="text-sm">
              <strong className="font-bold text-safari-green">283</strong> tonnes of carbon offset
            </span>
          </div>
          
          <div className="flex items-center">
            <Award className="h-5 w-5 mr-2 text-yellow-500" />
            <span className="text-sm">TripAdvisor Excellence Award</span>
          </div>
          
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-1 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">
              <strong className="font-bold">4.8/5</strong> from 1,200+ Reviews
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-5 w-5 mr-2 bg-green-600 rounded-full text-xs font-bold text-white">E</span>
            <span className="text-sm">Eco-Certified Operator</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSummary;