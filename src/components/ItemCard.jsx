import './ItemCard.css';

export default function ItemCard({ item, restaurant }) {
  const currencySymbol = restaurant.currency === 'MXN' ? '$' : restaurant.currency;

  return (
    <article className="item-card">
      <div className="item-header">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-price">
          {currencySymbol}{item.price.toLocaleString()}
        </span>
      </div>

      <p className="item-description">{item.description}</p>

      {item.includes && item.includes.length > 0 && (
        <div className="item-includes">
          <p className="includes-label">Incluye:</p>
          <ul className="includes-list">
            {item.includes.map((inc, idx) => (
              <li key={idx}>{inc}</li>
            ))}
          </ul>
        </div>
      )}

      {item.allergens && item.allergens.length > 0 && (
        <div className="item-allergens" role="note" aria-label="Información de alérgenos">
          <span className="allergen-icon">⚠️</span>
          <span className="allergen-text">
            Contiene: {item.allergens.join(', ')}
          </span>
        </div>
      )}
    </article>
  );
}
