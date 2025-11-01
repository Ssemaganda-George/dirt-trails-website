import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";

// Add sample gallery images for each guide
const guides = [
	{
		name: "Chemutai Simeon",
		bio: "Chemutai Simeon is a professional tour guide specializing in Sipi Falls and Mount Elgon Adventures. Based in Kapchorwa district, eastern Uganda, he offers expert guiding services in the Sipi region. Reach out for unforgettable adventures in the heart of Uganda's highlands.",
		image: "/images/guides/Simeon/john-okello-1.jpg",
		rating: 4.8,
		ratingsCount: 32,
		slug: "john-okello",
		// phone: "0777495336",
		whatsapp: "0774968565",
		facebook: "https://facebook.com/chemutai.simeon",
		instagram: "https://instagram.com/chemutai.simeon",
		twitter: "https://twitter.com/chemutaisimeon",
		gallery: [
      "/images/guides/Simeon/john-okello-8.jpg",
			"/images/guides/Simeon/john-okello-2.jpg",
			"/images/guides/Simeon/john-okello-3.jpg",
      "/images/guides/Simeon/john-okello-4.jpg",
      "/images/guides/Simeon/john-okello-5.jpg",
      "/images/guides/Simeon/john-okello-6.jpg",
      "/images/guides/Simeon/john-okello-7.jpg",
      "/images/guides/Simeon/john-okello-9.jpg",
      "/images/guides/Simeon/john-okello-10.jpg",
		]
	},
	{
		name: "Grace Nambasa",
		bio: "Grace specializes in primate trekking and cultural tours, sharing deep knowledge of local communities.",
		image: "/images/guides/grace-nambasa.jpg",
		rating: 4.9,
		ratingsCount: 41,
		slug: "grace-nambasa",
		phone: "",
		whatsapp: "",
		facebook: "",
		instagram: "",
		twitter: "",
		gallery: [
			"/images/guides/grace-nambasa-1.jpg",
			"/images/guides/grace-nambasa-2.jpg",
			"/images/guides/grace-nambasa-3.jpg"
		]
	},
	{
		name: "Peter Kamau",
		bio: "Peter is a certified driver-guide with a love for the savannah and the Big Five.",
		image: "/images/guides/peter-kamau.jpg",
		rating: 4.7,
		ratingsCount: 28,
		slug: "peter-kamau",
		phone: "",
		whatsapp: "",
		facebook: "",
		instagram: "",
		twitter: "",
		gallery: [
			"/images/guides/peter-kamau-1.jpg",
			"/images/guides/peter-kamau-2.jpg",
			"/images/guides/peter-kamau-3.jpg"
		]
	}
];

const GuidesPage = () => {
	const [ratings, setRatings] = useState(
		guides.map((g) => ({ rating: g.rating, ratingsCount: g.ratingsCount }))
	);
	const [selected, setSelected] = useState<number | null>(null);
	const [galleryIdx, setGalleryIdx] = useState(0);

	// Auto-slide logic
	const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (selected !== null) {
			autoSlideRef.current = setInterval(() => {
				setGalleryIdx((prev) =>
					(prev + 1) % guides[selected].gallery.length
				);
			}, 3500);
			return () => {
				if (autoSlideRef.current) clearInterval(autoSlideRef.current);
			};
		}
	}, [selected, guides]);

	const handleRate = (idx: number, newRating: number) => {
		setRatings((prev) =>
			prev.map((r, i) =>
				i === idx
					? {
							rating: (r.rating * r.ratingsCount + newRating) / (r.ratingsCount + 1),
							ratingsCount: r.ratingsCount + 1,
					  }
					: r
			)
		);
	};

	const openGuide = (idx: number) => {
		setSelected(idx);
		setGalleryIdx(0);
	};

	const closeGuide = () => {
		setSelected(null);
		setGalleryIdx(0);
		if (autoSlideRef.current) clearInterval(autoSlideRef.current);
	};

	const nextImage = () => {
		if (selected === null) return;
		setGalleryIdx((prev) =>
			(prev + 1) % guides[selected].gallery.length
		);
		if (autoSlideRef.current) {
			clearInterval(autoSlideRef.current);
			autoSlideRef.current = setInterval(() => {
				setGalleryIdx((prev) =>
					(prev + 1) % guides[selected].gallery.length
				);
			}, 3500);
		}
	};

	const prevImage = () => {
		if (selected === null) return;
		setGalleryIdx((prev) =>
			(prev - 1 + guides[selected].gallery.length) % guides[selected].gallery.length
		);
		if (autoSlideRef.current) {
			clearInterval(autoSlideRef.current);
			autoSlideRef.current = setInterval(() => {
				setGalleryIdx((prev) =>
					(prev + 1) % guides[selected].gallery.length
				);
			}, 3500);
		}
	};

	return (
		<div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
			<section className="py-20">
				<div className="container">
					<div className="text-center mb-12">
						<h1 className="text-5xl font-bold mb-4 text-safari-brown">
							Meet Our Guides
						</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Meet, join and support the expert guides who make every Dirt Trails safari safe,
							insightful, and unforgettable.
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
						{guides.map((guide, idx) => (
							<div
								key={idx}
								className="group bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-safari-green/10"
								onClick={() => openGuide(idx)}
								tabIndex={0}
								role="button"
								aria-label={`View profile for ${guide.name}`}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") openGuide(idx);
								}}
							>
								<div className="relative mb-4">
									<img
										src={guide.image}
										alt={guide.name}
										className="w-32 h-32 object-cover rounded-full border-4 border-safari-green shadow group-hover:ring-4 group-hover:ring-safari-green/20 transition-all duration-300"
									/>
									<span className="absolute bottom-2 right-2 bg-safari-green text-white text-xs px-2 py-0.5 rounded-full shadow font-semibold">
										{guide.rating.toFixed(1)}
									</span>
								</div>
								<h3 className="text-xl font-bold text-safari-brown mb-1 text-center">
									{guide.name}
								</h3>
								<div className="flex items-center justify-center mb-2">
									{[1, 2, 3, 4, 5].map((star) => (
										<svg
											key={star}
											onClick={(e) => {
												e.stopPropagation();
												handleRate(idx, star);
											}}
											className={`w-5 h-5 cursor-pointer ${
												star <= Math.round(ratings[idx].rating)
													? "text-yellow-400"
													: "text-gray-300"
											} transition-colors`}
											fill="currentColor"
											viewBox="0 0 20 20"
											aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
										</svg>
									))}
									<span className="ml-2 text-safari-green font-semibold text-sm">
										({ratings[idx].ratingsCount})
									</span>
								</div>
								<div className="mt-2 text-center">
									<span className="inline-block bg-safari-green/10 text-safari-green text-xs px-3 py-1 rounded-full font-medium">
										View profile
									</span>
								</div>
							</div>
						))}
					</div>
					<div className="text-center mt-8 sm:mt-12">
						<Link
							to="/contact"
							className="inline-block px-8 py-3 bg-safari-orange text-white rounded-xl font-semibold shadow-lg hover:bg-safari-green transition-all duration-300"
						>
							Join Our Guides
						</Link>
					</div>
				</div>
			</section>
			{/* Guide Modal */}
			{selected !== null && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2">
					<div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 p-0 relative animate-fade-in-up flex flex-col md:flex-row overflow-hidden">
						{/* Gallery Section */}
						<div className="md:w-2/3 w-full bg-safari-green/5 flex flex-col justify-center items-center relative p-4">
							<div className="relative w-full">
								<button
									className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-safari-green/80 text-safari-green hover:text-white rounded-full p-2 shadow transition"
									onClick={e => { e.stopPropagation(); prevImage(); }}
									aria-label="Previous image"
									type="button"
									tabIndex={0}
								>
									<svg width={32} height={32} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
										<path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</button>
								<div className="overflow-hidden w-full flex items-center justify-center">
									<div
										className="flex transition-transform duration-500"
										style={{
											transform: `translateX(-${galleryIdx * 100}%)`,
											width: `${guides[selected].gallery.length * 100}%`
										}}
									>
										{guides[selected].gallery.map((img, i) => (
											<img
												key={i}
												src={img}
												alt={`Safari with ${guides[selected].name} ${i + 1}`}
												className="rounded-xl w-full h-[28rem] object-cover flex-shrink-0"
												style={{ width: "100%" }}
											/>
										))}
									</div>
								</div>
								<button
									className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-safari-green/80 text-safari-green hover:text-white rounded-full p-2 shadow transition"
									onClick={e => { e.stopPropagation(); nextImage(); }}
									aria-label="Next image"
									type="button"
									tabIndex={0}
								>
									<svg width={32} height={32} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
										<path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</button>
							</div>
							<div className="flex justify-center gap-2 mt-3">
								{guides[selected].gallery.map((_, i) => (
									<button
										key={i}
										className={`w-3 h-3 rounded-full ${i === galleryIdx ? "bg-safari-green" : "bg-gray-300"}`}
										onClick={e => { e.stopPropagation(); setGalleryIdx(i); }}
										aria-label={`Go to image ${i + 1}`}
									/>
								))}
							</div>
						</div>
						{/* Info Section */}
						<div className="md:w-1/3 w-full flex flex-col items-center justify-center p-8 relative">
							<button
								className="absolute top-4 right-4 text-gray-400 hover:text-safari-green transition-colors"
								onClick={closeGuide}
								aria-label="Close guide profile"
							>
								<svg width={28} height={28} viewBox="0 0 24 24" fill="none">
									<path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
									<path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
								</svg>
							</button>
							<img
								src={guides[selected].image}
								alt={guides[selected].name}
								className="w-32 h-32 rounded-full object-cover mb-3 border-4 border-safari-green/20 shadow"
							/>
							<h3 className="text-2xl font-bold mb-1 text-safari-brown text-center">{guides[selected].name}</h3>
							<div className="flex items-center justify-center mb-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<svg
										key={star}
										onClick={() => handleRate(selected, star)}
										className={`w-5 h-5 cursor-pointer ${
											star <= Math.round(ratings[selected].rating)
												? "text-yellow-400"
												: "text-gray-300"
										} transition-colors`}
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
									>
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
									</svg>
								))}
								<span className="ml-2 text-safari-green font-semibold text-sm">
									{ratings[selected].rating.toFixed(1)} ({ratings[selected].ratingsCount})
								</span>
							</div>
							{/* Phone/WhatsApp */}
							{(guides[selected].phone || guides[selected].whatsapp) && (
								<div className="flex flex-col items-center gap-2 mb-2">
									{guides[selected].phone && (
										<a
											href={`tel:${guides[selected].phone}`}
											className="flex items-center gap-1 text-safari-green hover:text-safari-orange font-medium"
											title="Call"
										>
											<Phone size={18} /> {guides[selected].phone}
										</a>
									)}
									{guides[selected].whatsapp && (
										<a
											href={`https://wa.me/256${guides[selected].whatsapp.replace(/^0/, "")}`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-1 text-green-600 hover:text-green-800 font-medium"
											title="WhatsApp"
										>
											<MessageCircle size={18} /> {guides[selected].whatsapp}
										</a>
									)}
								</div>
							)}
							{/* Socials below phone/whatsapp */}
							<div className="flex flex-row justify-center gap-4 mb-4">
								{guides[selected].facebook && (
									<a
										href={guides[selected].facebook}
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:text-blue-800"
										title="Facebook"
									>
										<Facebook size={22} />
									</a>
								)}
								{guides[selected].instagram && (
									<a
										href={guides[selected].instagram}
										target="_blank"
										rel="noopener noreferrer"
										className="text-pink-500 hover:text-pink-700"
										title="Instagram"
									>
										<Instagram size={22} />
									</a>
								)}
								{guides[selected].twitter && (
									<a
										href={guides[selected].twitter}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sky-500 hover:text-sky-700"
										title="Twitter"
									>
										<Twitter size={22} />
									</a>
								)}
							</div>
							<p className="text-gray-700 text-base mb-4 text-center whitespace-pre-line">{guides[selected].bio}</p>
						</div>
					</div>
					<div
						className="fixed inset-0 z-40"
						onClick={closeGuide}
						aria-label="Close guide overlay"
					/>
				</div>
			)}
		</div>
	);
};

export default GuidesPage;
