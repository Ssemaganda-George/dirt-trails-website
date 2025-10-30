import React, { useMemo, useState } from "react";
import { tours } from "../data/tours";

export default function HeroSearch(): JSX.Element {
  const [query, setQuery] = useState<string>("");

  const normalized = (s?: string) => (s || "").toLowerCase();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tours; // show all when empty (or you can change to featured only)
    return tours.filter((t) => {
      // searchable fields
      const haystack = [
        t.name,
        t.tagline,
        t.description,
        t.location,
        t.country,
        t.slug,
        ...(t.highlights || []),
        ...(t.inclusions || []),
      ]
        .map((s) => normalized(s))
        .join(" ");

      return haystack.includes(q);
    });
  }, [query]);

  return (
    <section aria-labelledby="hero-search-heading" style={{ padding: 20 }}>
      <h2 id="hero-search-heading">Find Your Perfect Safari</h2>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, park, country, activity..."
          aria-label="Search tours"
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />
        <button
          onClick={() => setQuery("")}
          aria-label="Clear search"
          style={{
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginTop: 18 }}>
        <p style={{ margin: 0 }}>
          Showing {results.length} result{results.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 12, display: "grid", gap: 12 }}>
        {results.length === 0 && <li>No tours found for "{query}".</li>}

        {results.map((t) => (
          <li
            key={t.id}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 8,
              background: "#fafafa",
            }}
          >
            <img
              src={t.coverImage || (t.images && t.images[0]?.url) || "/images/placeholder.jpg"}
              alt={t.name}
              style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }}
            />
            <div style={{ flex: 1 }}>
              <a
                href={`/tours/${t.slug}`}
                style={{ fontSize: 16, fontWeight: 600, color: "#111", textDecoration: "none" }}
              >
                {t.name}
              </a>
              <div style={{ color: "#555", marginTop: 4 }}>{t.tagline}</div>
              <div style={{ marginTop: 6, display: "flex", gap: 12, color: "#333", fontSize: 14 }}>
                <span>Location: {t.location}</span>
                <span>Country: {t.country}</span>
                <span>Duration: {t.duration} days</span>
                <span>Price: {t.price}</span>
              </div>
            </div>
            <div style={{ textAlign: "right", minWidth: 80 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{t.rating}★</div>
              <a
                href={`/tours/${t.slug}`}
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  padding: "6px 10px",
                  background: "#0b6d3a",
                  color: "#fff",
                  borderRadius: 6,
                  textDecoration: "none",
                }}
              >
                View
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
