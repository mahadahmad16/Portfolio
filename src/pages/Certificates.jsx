import { useEffect, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import GlowCard from "../components/common/GlowCard";
import { CERTIFICATES } from "../data/certificates";
import "./Certificates.css";

/**
 * Renders certificates directly with GlowCard rather than assuming a
 * components/certificates/CertificateCard API, since that folder was
 * built separately. Swap this page's markup for your own
 * CertificateCard/CertificateLightbox if you'd rather use those.
 */
export default function Certificates() {
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") setActiveCertificate(null);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="certificates">
      <SectionHeading
        eyebrow="Recognition"
        title="Certificates"
        description="Certifications and project recognitions I've earned so far."
      />

      <div className="certificates__grid">
        {CERTIFICATES.map((certificate) => (
          <GlowCard
            as="article"
            interactive
            key={certificate.id}
            className="certificates__card"
          >
            <button
              type="button"
              className="certificates__thumb"
              onClick={() => setActiveCertificate(certificate)}
              aria-label={`View larger image of ${certificate.title}`}
            >
              <img src={certificate.image} alt={certificate.title} />
            </button>
            <h3 className="certificates__title">{certificate.title}</h3>
            <p className="certificates__program">{certificate.program}</p>
            <p className="certificates__meta">
              {certificate.issuer} · {certificate.date}
            </p>
          </GlowCard>
        ))}
      </div>

      {activeCertificate && (
        <div
          className="certificates__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeCertificate.title}
          onClick={() => setActiveCertificate(null)}
        >
          <button
            type="button"
            className="certificates__lightbox-close"
            onClick={() => setActiveCertificate(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={activeCertificate.image}
            alt={activeCertificate.title}
            className="certificates__lightbox-img"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
