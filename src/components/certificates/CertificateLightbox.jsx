import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X } from "lucide-react";
import "./CertificateLightbox.css";

/**
 * Controlled certificate preview dialog. Render it beside a certificate
 * list, pass the selected certificate as `certificate`, and clear that
 * selection through `onClose`.
 */
export default function CertificateLightbox({ certificate, onClose }) {
  const closeButtonRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!certificate) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const { title, issuer, image, imageAlt, credentialUrl } = certificate;

  return createPortal(
    <div
      className="certificate-lightbox"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="certificate-lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="certificate-lightbox__close"
          onClick={onClose}
          aria-label="Close certificate preview"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {image && (
          <img
            className="certificate-lightbox__image"
            src={image}
            alt={imageAlt || `${title} certificate`}
          />
        )}

        <div className="certificate-lightbox__details">
          <div>
            <h2 id={titleId}>{title}</h2>
            {issuer && <p>{issuer}</p>}
          </div>
          {credentialUrl && (
            <a href={credentialUrl} target="_blank" rel="noreferrer">
              Verify credential <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
}
