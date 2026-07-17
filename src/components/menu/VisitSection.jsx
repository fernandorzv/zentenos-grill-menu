import ImageWithFallback from './ImageWithFallback';

export default function VisitSection({
  iconClockUrl,
  iconExternalLinkUrl,
  iconLocationUrl,
  mapImageUrl,
  mapsUrl,
  restaurant,
  serviceHoursLabel,
}) {
  return (
    <section className="zg-menu-section zg-menu-section--visit" id="visitanos" aria-labelledby="visitanos-title">
      <h2 className="zg-section-title" id="visitanos-title">Vis&iacute;tanos</h2>
      <article className="zg-block zg-visit-grid">
        <div className="zg-visit-panel zg-visit-panel--contact">
          <dl className="zg-visit-list">
            <div className="zg-visit-item">
              <dt>
                <span className="zg-visit-icon-shell" aria-hidden="true">
                  <img className="zg-visit-icon" src={iconLocationUrl} alt="" loading="lazy" decoding="async" />
                </span>
                Direcci&oacute;n
              </dt>
              <dd>{restaurant.address}</dd>
            </div>
            <div className="zg-visit-item">
              <dt>
                <span className="zg-visit-icon-shell" aria-hidden="true">
                  <img className="zg-visit-icon" src={iconClockUrl} alt="" loading="lazy" decoding="async" />
                </span>
                Horario
              </dt>
              <dd>{serviceHoursLabel}</dd>
            </div>
            <div className="zg-visit-item">
              <dt>
                <span className="zg-visit-icon-shell zg-visit-phone-icon" aria-hidden="true">☎</span>
                Tel&eacute;fono
              </dt>
              <dd>{restaurant.phone}</dd>
            </div>
          </dl>
        </div>

        <div className="zg-visit-panel zg-visit-panel--map">
          <div className="zg-visit-map-wrap">
            <ImageWithFallback
              src={mapImageUrl}
              alt="Mapa de ubicaci&oacute;n"
              className="zg-visit-map"
              fallbackClassName="zg-visit-map-fallback"
              fallbackLabel="Mapa"
            />
            <span className="zg-visit-map-pin" aria-hidden="true">
              <img className="zg-visit-icon" src={iconLocationUrl} alt="" loading="lazy" decoding="async" />
            </span>
          </div>
          <a className="zg-map-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">
            Ver en Google Maps
            {iconExternalLinkUrl ? <img className="zg-map-link-icon" src={iconExternalLinkUrl} alt="" aria-hidden="true" loading="lazy" decoding="async" /> : null}
          </a>
        </div>
      </article>
    </section>
  );
}


