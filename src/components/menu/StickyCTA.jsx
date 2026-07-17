export default function StickyCTA({ iconWhatsappUrl, whatsappUrl }) {
  return (
    <aside className="zg-sticky-cta" aria-label="Ordenar por WhatsApp">
      <a className="zg-btn zg-btn-primary zg-sticky-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <img className="zg-btn-icon zg-sticky-icon" src={iconWhatsappUrl} alt="" aria-hidden="true" loading="eager" decoding="async" />
        <span>Ordenar por WhatsApp</span>
      </a>
    </aside>
  );
}


