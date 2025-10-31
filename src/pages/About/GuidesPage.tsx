import React from "react";

const guides = [
  {
    name: "John Okello",
    bio: "With 10+ years guiding in Uganda and Kenya, John is a passionate birder and wildlife tracker.",
    image: "/images/guide-john.jpg"
  },
  {
    name: "Grace Nambasa",
    bio: "Grace specializes in primate trekking and cultural tours, sharing deep knowledge of local communities.",
    image: "/images/guide-grace.jpg"
  },
  {
    name: "Peter Kamau",
    bio: "Peter is a certified driver-guide with a love for the savannah and the Big Five.",
    image: "/images/guide-peter.jpg"
  }
];

const GuidesPage = () => (
  <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-safari-brown">Our Guides</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the expert guides who make every Dirt Trails safari safe, insightful, and unforgettable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-safari-green shadow"
              />
              <h3 className="text-xl font-bold text-safari-brown mb-2">{guide.name}</h3>
              <p className="text-gray-600 text-center">{guide.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default GuidesPage;
