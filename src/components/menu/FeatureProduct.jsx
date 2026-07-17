import ImageWithFallback from './ImageWithFallback';
import { PRODUCT_SHORT_COPY, formatPrice, getPrimaryPriceVariation } from './menuUtils';

export default function FeatureProduct({ agujaImageUrl, agujaItem, restaurant }) {
  if (!agujaItem) return null;

  const agujaPrice250 = getPrimaryPriceVariation(agujaItem, 'size-250g');
  const agujaPrice500 = getPrimaryPriceVariation(agujaItem, 'size-500g');
  const primaryPrice = formatPrice(agujaPrice250?.priceModifier ?? agujaItem.price, restaurant.currency);
  const secondaryPrice = agujaPrice500 ? formatPrice(agujaPrice500.priceModifier, restaurant.currency) : null;

  return (
    <section className="zg-menu-section zg-menu-section--feature" id="agujas-nortenas" aria-labelledby="agujas-title">
      <article className="zg-block zg-feature-block">
        <div className="zg-feature-media">
          <ImageWithFallback
            src={agujaImageUrl}
            alt={agujaItem.name}
            className="zg-feature-image"
            fallbackClassName="zg-feature-image-fallback"
            fallbackLabel="Agujas"
          />
        </div>

        <div className="zg-feature-copy">
          <div className="zg-feature-heading-row">
            <h2 className="zg-feature-title" id="agujas-title">Agujas Norte&ntilde;as</h2>
            <span className="zg-feature-mark" aria-hidden="true">⌁</span>
          </div>

          <div className="zg-feature-price-row">
            <p className="zg-feature-price">{primaryPrice}</p>
            <p className="zg-feature-size-pill">Orden de 250 g</p>
          </div>

          {secondaryPrice && (
            <p className="zg-feature-size-row zg-feature-size-row--secondary">
              Tambi&eacute;n disponible orden de 500 g: {secondaryPrice}
            </p>
          )}

          <p className="zg-block-text zg-feature-description">
            {PRODUCT_SHORT_COPY[agujaItem.id] || agujaItem.description}
          </p>
        </div>
      </article>
    </section>
  );
}
