import React from "react";
import CommunityHero from "../components/community/CommunityHero";
import CommunityCard from "../components/community/CommunityCard";
import styles from "../components/community/community.module.css";
import { Link } from "react-router-dom";

const communityData = [
	{
		id: "dirt-trails-foundation",
		title: "Dirt Trails Foundation",
		image: "https://via.placeholder.com/1200x675?text=Dirt+Trails+Foundation",
		description:
			"The Dirt Trails Foundation funds local trail conservation, youth cycling programs, and community events. Explore ongoing projects, volunteer opportunities and ways to support our work.",
		link: "https://dirttrailsfoundation.example.org",
		cta: "Visit Foundation"
	},
	{
		id: "local-trail-maintenance",
		title: "Local Trail Maintenance",
		image: "https://via.placeholder.com/1200x675?text=Trail+Maintenance",
		description:
			"Our monthly trail maintenance days bring volunteers together to repair and improve singletrack. Tools and training are provided — no experience necessary.",
		link: "/contact",
		cta: "Join a Day"
	},
	{
		id: "youth-programs",
		title: "Youth Bikes & Clinics",
		image: "https://via.placeholder.com/1200x675?text=Youth+Programs",
		description:
			"We run free and low-cost riding clinics, bike repairs and mentorship programs to make cycling accessible to local youth and grow the next generation of riders.",
		link: "/contact",
		cta: "Get Involved"
	}
];

const CommunityPage: React.FC = () => {
	return (
		<div>
			<CommunityHero
				title="Community & The Dirt Trails Foundation"
				subtitle="Protecting trails, growing riders, and giving back to our local cycling communities"
			/>

			<main className={styles.container} aria-labelledby="community-heading">
				<section className={styles.intro} id="community-heading">
					<h2 className={styles.h2}>Our partnership with the community</h2>
					<p className={styles.lead}>
						Dirt Trails Safaris partners with local groups and the Dirt Trails Foundation to preserve trail access,
						build resilient singletrack, and provide programs that welcome more people to the outdoors. Below are
						our core initiatives, with clear ways to support or get involved.
					</p>

					<div className={styles.actions}>
						<a
							href={communityData[0].link}
							target="_blank"
							rel="noopener noreferrer"
							className={styles.primaryButton}
							aria-label="Visit Dirt Trails Foundation (opens in a new tab)"
						>
							{communityData[0].cta}
						</a>
						<Link to="/contact" className={styles.outlineButton} aria-label="Contact us to volunteer">
							Volunteer / Contact Us
						</Link>
					</div>
				</section>

				{/* Quick impact numbers */}
				<section className={styles.stats} aria-label="Community impact">
					<div className={styles.statsInner}>
						<div className={styles.statItem}>
							<span className={styles.statNumber}>120+</span>
							<span className={styles.statLabel}>Volunteer days held</span>
						</div>
						<div className={styles.statItem}>
							<span className={styles.statNumber}>3,400 m</span>
							<span className={styles.statLabel}>Trail meters maintained</span>
						</div>
						<div className={styles.statItem}>
							<span className={styles.statNumber}>1,200</span>
							<span className={styles.statLabel}>Kids reached by programs</span>
						</div>
					</div>
				</section>

				{/* Initiatives grid */}
				<section className={styles.grid} aria-labelledby="initiatives">
					<h3 id="initiatives" className="sr-only">Community initiatives</h3>
					{communityData.map((item) => (
						<CommunityCard
							key={item.id}
							title={item.title}
							image={item.image}
							description={item.description}
							link={item.link}
							cta={item.cta}
						/>
					))}
				</section>

				{/* Partners */}
				<section className={styles.partners} aria-label="Partners and supporters">
					<h4 className={styles.partnerTitle}>Partners & supporters</h4>
					<div className={styles.partnerLogos}>
						{/* realistic placeholders — replace with real logos */}
						<img src="https://via.placeholder.com/160x60?text=Park+Trust" alt="Park Trust logo" />
						<img src="https://via.placeholder.com/160x60?text=Bike+Coop" alt="Bike Coop logo" />
						<img src="https://via.placeholder.com/160x60?text=Trail+Alliance" alt="Trail Alliance logo" />
						<img src="https://via.placeholder.com/160x60?text=Local+School" alt="Local School logo" />
					</div>
				</section>

				<section className={styles.footerNote}>
					<p>
						We are always looking for volunteers, partners and donors. If you'd like to propose a partnership,
						host a clinic, or arrange a group volunteer day, please{" "}
						<Link to="/contact" className={styles.link}>
							get in touch
						</Link>.
					</p>
				</section>
			</main>
		</div>
	);
};

export default CommunityPage;
