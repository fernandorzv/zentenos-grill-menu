import './WhatsAppCTA.css';

export default function WhatsAppCTA({ restaurant, tableId }) {
  const whatsappNumber = restaurant.whatsappNumber.replace(/\D/g, '');
  const message = tableId
    ? `Hola, soy de la mesa ${tableId}. Quisiera hacer un pedido.`
    : 'Hola, quisiera hacer un pedido.';
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const phoneUrl = `tel:${restaurant.phone}`;

  return (
    <div className="cta-bar">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button cta-whatsapp"
        aria-label="Enviar mensaje por WhatsApp"
      >
        <span className="cta-icon">💬</span>
        <span className="cta-text">Ordenar por WhatsApp</span>
      </a>
      
      <a
        href={phoneUrl}
        className="cta-button cta-call"
        aria-label="Llamar al restaurante"
      >
        <span className="cta-icon">📞</span>
        <span className="cta-text">{restaurant.phone}</span>
      </a>
    </div>
  );
}
