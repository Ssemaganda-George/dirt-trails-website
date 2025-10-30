import React from "react";
import styles from "./community.module.css";

type Props = {
  title: string;
  subtitle?: string;
};

const CommunityHero: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <header className={styles.hero} role="banner" aria-label="Community hero">
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
};

export default CommunityHero;
