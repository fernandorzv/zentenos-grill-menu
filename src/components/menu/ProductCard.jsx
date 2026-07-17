import ImageWithFallback from './ImageWithFallback';
import { PRODUCT_IMAGES, PRODUCT_SHORT_COPY, formatPrice, getAssetUrl, getIncludesFriesLine } from './menuUtils';

export default function ProductCard({ iconFriesUrl, item, restaurant }) {
  const productFile = PRODUCT_IMAGES[item.id] || PRODUCT_IMAGES.burger;

  return (
    <article className="zg-shell-card" role="listitem">
      <div className="zg-product-media">
        <ImageWithFallback
          src={getAssetUrl(`products/${productFile}`)}
          alt={item.name}
          className="zg-product-image"
          fallbackClassName="zg-product-image-fallback"
          fallbackLabel={item.name}
        />
      </div>

      <div className="zg-product-content">
        <h3 className="zg-product-name">{item.name}</h3>
        <p className="zg-shell-price">{formatPrice(item.price, restaurant.currency)}</p>
        <p className="zg-card-description">{PRODUCT_SHORT_COPY[item.id] || item.description}</p>
        <p className="zg-includes-line">
          <img className="zg-inline-icon" src={iconFriesUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          {getIncludesFriesLine(item)}
        </p>
      </div>
    </article>
  );
}


