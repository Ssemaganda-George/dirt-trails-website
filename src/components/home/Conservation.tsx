import { useState } from 'react';
import { TreePine, Heart, Leaf, Award, Globe, CheckCircle, ArrowRight, Users, Target } from 'lucide-react';

const StatCard = ({ icon: Icon, number, label, gradient }) => (
  <div className="text-center group">
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300 mx-auto`}>
      <Icon size={24} className="text-white" />
    </div>
    <div className={`text-2xl font-bold bg-gradient-to-r ${gradient.replace('to-br', 'to-r')} bg-clip-text text-transparent`}>
      {number}
    </div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

const ImpactCard = ({ icon: Icon, title, description, gradient, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border border-gray-100/50"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
      
      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} className="text-white" />
        </div>
        
        <h3 className={`text-lg font-bold mb-3 bg-gradient-to-r ${gradient.replace('to-br', 'to-r')} bg-clip-text text-transparent`}>
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const Conservation = () => {
  const impactAreas = [
    {
      icon: TreePine,
      title: "Reforestation Projects",
      description: "Every booking plants 10 trees in degraded ecosystems, helping restore wildlife corridors and combat climate change.",
      gradient: "from-green-600 to-emerald-500",
      delay: 0
    },
    {
      icon: Heart,
      title: "Community Support", 
      description: "Direct funding for local communities through education, healthcare, and sustainable livelihood programs.",
      gradient: "from-pink-500 to-rose-500",
      delay: 200
    },
    {
      icon: Globe,
      title: "Wildlife Protection",
      description: "Supporting anti-poaching efforts and wildlife research to protect endangered species across East Africa.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 400
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-300/30 rounded-full px-4 py-2 mb-6">
              <Leaf className="text-green-600" size={16} />
              <span className="text-green-700 font-medium text-sm tracking-wide">CONSERVATION IMPACT</span>
            </div>

            {/* Main heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Supporting Conservation
              </span>
              <span className="block bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Across East Africa
              </span>
            </h2>

            {/* Description */}
            <p className="mb-6 text-gray-600 leading-relaxed">
              At Dirt Trails Safaris, we believe in responsible tourism that benefits local communities and protects wildlife habitats. Through our Environmental Conservation Program, $50 from each booking goes directly to important conservation initiatives.
            </p>

            <p className="mb-8 text-gray-600 leading-relaxed">
              When you add our Tree Planting Program to your booking, you'll receive a certificate and tracking link to monitor the growth and impact of your contribution to reforestation efforts.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span className="text-gray-600 text-sm">Certified Eco-Tourism</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="text-amber-500" size={16} />
                <span className="text-gray-600 text-sm">Conservation Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-blue-500" size={16} />
                <span className="text-gray-600 text-sm">Community Focused</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
              Learn More About Our Efforts
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right content */}
          <div>
            {/* Image container with enhanced styling */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="/images/crested.jpg" 
                  alt="Conservation efforts - wildlife protection and reforestation in East Africa"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TreePine className="text-green-600" size={16} />
                      <span className="font-semibold text-sm text-gray-800">Conservation in Action</span>
                    </div>
                    <p className="text-xs text-gray-600">Every safari contributes to wildlife protection and community development</p>
                  </div>
                </div>
              </div>
            </div>

           
            
          </div>
        </div>

        {/* Impact areas section */}
        {/* <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Conservation Focus Areas
              </span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Making a real difference through targeted conservation efforts that protect wildlife, 
              restore ecosystems, and empower local communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <ImpactCard key={index} {...area} />
            ))}
          </div>
        </div> */}

        {/* Bottom CTA section */}
        <div className="text-center bg-gradient-to-r from-green-600/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-8 border border-green-200/30 mt-16">
          <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Ready to Make a Difference?
          </h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Join us in protecting East Africa's incredible wildlife and supporting local communities. 
            Every safari booking directly contributes to conservation efforts.
          </p>
          <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300">
            Book Your Conservation Safari
          </button>
        </div>
      </div>
    </section>
  );
};

export default Conservation;