import { PRODUCT_SHORT_COPY, formatPrice, getPrimaryPriceVariation } from './menuUtils';

export default function DrinkRow({ iconDrinkUrl, refrescoItem, restaurant }) {
  if (!refrescoItem) return null;

  const refresco400 = getPrimaryPriceVariation(refrescoItem, 'size-medium');
  const price = formatPrice(refresco400?.priceModifier ?? refrescoItem.price, restaurant.currency);

  return (
    <section className="zg-menu-section zg-menu-section--drinks" id="bebidas" aria-labelledby="refrescos-title">
      <article className="zg-block zg-block--compact zg-drink-row">
        <div className="zg-drink-icon-shell" aria-hidden="true">
          <img className="zg-drink-icon" src={iconDrinkUrl} alt="" loading="lazy" decoding="async" />
        </div>

        <div className="zg-drink-copy">
          <div className="zg-drink-row-title">
            <h2 id="refrescos-title">Refrescos</h2>
            <span className="zg-drink-volume">400 ml</span>
          </div>
          <p className="zg-block-text zg-drink-description">
            {PRODUCT_SHORT_COPY[refrescoItem.id] || refrescoItem.description}
          </p>
        </div>

        <p className="zg-drink-price">{price}</p>
      </article>
    </section>
  );
}


