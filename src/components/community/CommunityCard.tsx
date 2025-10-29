import React from "react";
import { Link } from "react-router-dom";
import styles from "./community.module.css";

type Props = {
  title: string;
  image?: string;
  description: string;
  link: string;
  cta?: string;
};

const CommunityCard: React.FC<Props> = ({ title, image, description, link, cta = "Learn more" }) => {
  const isExternal = /^https?:\/\//i.test(link);

  return (
    <article
      className={styles.card}
      aria-labelledby={`card-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      {image && (
        <div className={styles.cardImage}>
          <img src={image} alt={title} loading="lazy" />
        </div>
      )}

      <div className={styles.cardBody}>
        <h3
          id={`card-${title.replace(/\s+/g, "-").toLowerCase()}`}
          className={styles.cardTitle}
        >
          {title}
        </h3>
        <p className={styles.cardDesc}>{description}</p>

        {/* CTAs: internal routes use Link, external open in new tab */}
        {isExternal ? (
          <a
            className={styles.button}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${cta} - opens in a new tab`}
          >
            {cta}
          </a>
        ) : (
          <Link className={styles.button} to={link} aria-label={cta}>
            {cta}
          </Link>
        )}
      </div>
    </article>
  );
};

export default CommunityCard;
