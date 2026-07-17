import ImageWithFallback from './ImageWithFallback';

export default function PromoBanner({ promoImageUrl }) {
  return (
    <section className="zg-block zg-block--promo" aria-labelledby="opening-promo-title">
      <div className="zg-promo-icon" aria-hidden="true">
        <span />
      </div>

      <div className="zg-promo-copy">
        <p className="zg-promo-kicker">Solo por apertura</p>
        <h2 className="zg-block-title zg-promo-title" id="opening-promo-title">
          <span aria-hidden="true">★</span>
          Promoci&oacute;n de apertura
          <span aria-hidden="true">★</span>
        </h2>
        <p className="zg-block-text zg-promo-text">
          En la compra de cualquier hamburguesa, recibe de cortes&iacute;a una aguja norte&ntilde;a o una Corona 210 ml.
        </p>
      </div>

      <div className="zg-promo-visual" aria-hidden="true">
        <ImageWithFallback
          src={promoImageUrl}
          alt=""
          className="zg-promo-image"
          fallbackClassName="zg-promo-image-fallback"
          fallbackLabel="Promoci&oacute;n"
        />
      </div>
    </section>
  );
}
