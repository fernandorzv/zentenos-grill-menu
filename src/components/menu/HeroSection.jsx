import ImageWithFallback from './ImageWithFallback';

export default function HeroSection({
  brandImageUrl,
  heroImageUrl,
  iconLocationUrl,
  iconWhatsappUrl,
  mapsUrl,
  whatsappUrl,
}) {
  return (
    <section className="zg-hero-shell" aria-label="Zenteno's Grill, Asado al Carb&oacute;n">
      <ImageWithFallback
        src={heroImageUrl}
        alt="Parrilla con flamas"
        className="zg-hero-image"
        fallbackClassName="zg-hero-image-fallback"
        loading="eager"
        decode="sync"
      />
      <div className="zg-hero-overlay" aria-hidden="true" />
      <div className="zg-container zg-hero-content">
        <div className="zg-hero-brand-row">
          <div className="zg-hero-brand-lockup">
            <ImageWithFallback
              src={brandImageUrl}
              alt="Zenteno's Grill, Asado al Carb&oacute;n"
              className="zg-hero-emblem-mark"
              fallbackClassName="zg-hero-emblem-fallback"
              loading="eager"
            />
          </div>
          <a className="zg-menu-button" href="#menu-sections" aria-label="Ir al menu">
            <span />
            <span />
            <span />
          </a>
        </div>

        <div className="zg-hero-actions" aria-label="Acciones principales">
          <a className="zg-btn zg-btn-primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <img className="zg-btn-icon" src={iconWhatsappUrl} alt="" aria-hidden="true" loading="eager" decoding="async" />
            Ordenar por WhatsApp
          </a>
          <a className="zg-btn zg-btn-secondary" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <img className="zg-btn-icon" src={iconLocationUrl} alt="" aria-hidden="true" loading="eager" decoding="async" />
            C&oacute;mo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
