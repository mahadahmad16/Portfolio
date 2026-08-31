import { Award, ExternalLink } from "lucide-react";
import GlowCard from "../common/GlowCard";
import "./CertificateCard.css";

/**
 * Certificate preview card. Pass onView to open the image in
 * CertificateLightbox, and credentialUrl when a public verification link
 * is available.
 */
export default function CertificateCard({
  title,
  issuer,
  issuedDate,
  image,
  imageAlt,
  credentialUrl,
  onView,
}) {
  const canPreview = Boolean(image && onView);

  return (
    <GlowCard as="article" interactive={canPreview} className="certificate-card">
      <div className="certificate-card__media">
        {image ? (
          canPreview ? (
            <button
              type="button"
              className="certificate-card__preview-button"
              onClick={onView}
              aria-label={`View ${title} certificate`}
            >
              <img
                className="certificate-card__image"
                src={image}
                alt={imageAlt || `${title} certificate`}
                loading="lazy"
              />
              <span className="certificate-card__view-label">View certificate</span>
            </button>
          ) : (
            <img
              className="certificate-card__image"
              src={image}
              alt={imageAlt || `${title} certificate`}
              loading="lazy"
            />
          )
        ) : (
          <div className="certificate-card__placeholder" aria-hidden="true">
            <Award size={32} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="certificate-card__content">
        <div className="certificate-card__icon" aria-hidden="true">
          <Award size={17} strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="certificate-card__title">{title}</h3>
          {issuer && <p className="certificate-card__issuer">{issuer}</p>}
          {issuedDate && <p className="certificate-card__date">Issued {issuedDate}</p>}

          {credentialUrl && (
            <a
              className="certificate-card__credential-link"
              href={credentialUrl}
              target="_blank"
              rel="noreferrer"
            >
              Verify credential <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  );
}
