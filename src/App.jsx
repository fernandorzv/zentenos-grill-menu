import { useState, useEffect, useMemo, useCallback } from 'react';
import DrinkRow from './components/menu/DrinkRow';
import FeatureProduct from './components/menu/FeatureProduct';
import HamburgersSection from './components/menu/HamburgersSection';
import HeroSection from './components/menu/HeroSection';
import StickyCTA from './components/menu/StickyCTA';
import VisitSection from './components/menu/VisitSection';
import {
  MAPS_URL,
  UI_ICON_FILES,
  formatServiceHours,
  formatUpdatedAt,
  getAssetUrl,
  getPageAssetsStyle,
  getWhatsAppUrl,
} from './components/menu/menuUtils';
import './styles/App.css';

export default function App() {
  const [tableId, setTableId] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadPublicMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${import.meta.env.BASE_URL}menu-public.json`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error(`Unable to load menu (${response.status})`);
      }

      const data = await response.json();
      setMenuData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load menu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t');
    if (t) setTableId(t);
    loadPublicMenu();
  }, [loadPublicMenu]);

  const restaurant = menuData?.restaurant;
  const categories = menuData?.categories ?? [];
  const items = menuData?.items ?? [];

  const sections = useMemo(() => {
    return [...categories]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => ({
        ...category,
        items: items
          .filter((item) => item.categoryId === category.id)
          .filter((item) => item.availability?.isAvailable !== false)
          .sort((a, b) => a.sortOrder - b.sortOrder),
      }));
  }, [categories, items]);

  const pageAssetsStyle = getPageAssetsStyle();

  if (loading) {
    return (
      <main className="zg-page zg-container" id="main-content" style={pageAssetsStyle}>
        <section className="zg-status-card" role="status" aria-live="polite">
          <p className="status-eyebrow">Zenteno's Grill</p>
          <p className="status-title">Cargando men&uacute;...</p>
          <p className="status-text">Preparando la carta para ti.</p>
          <div className="zg-loading-skeleton" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>
      </main>
    );
  }

  if (error || !menuData || !restaurant) {
    return (
      <main className="zg-page zg-container" id="main-content" style={pageAssetsStyle}>
        <section className="zg-status-card zg-status-card--error" role="alert">
          <p className="status-eyebrow">Men&uacute; no disponible</p>
          <p className="status-title">No fue posible cargar el men&uacute;.</p>
          <p className="status-text">{error || 'Intenta nuevamente en unos minutos.'}</p>
          <button className="zg-btn zg-btn-secondary" type="button" onClick={loadPublicMenu}>
            Reintentar
          </button>
        </section>
      </main>
    );
  }

  const whatsappUrl = getWhatsAppUrl(restaurant.whatsappNumber, tableId);
  const menuVersion = menuData.menuVersion || menuData.version || 'n/a';
  const updatedAt = menuData.updatedAt || menuData.lastUpdated || '';
  const publishedAt = formatUpdatedAt(updatedAt);
  const releaseCommit = (import.meta.env.VITE_GIT_SHA || 'local').slice(0, 7);
  const mapsUrl = restaurant.mapsUrl || MAPS_URL;
  const serviceHoursLabel = formatServiceHours(restaurant.serviceHours);

  const assetUrls = {
    brand: getAssetUrl('brand/zentenos-emblem.png'),
    hero: getAssetUrl('hero/hero-grill-flame.jpg'),
    agujas: getAssetUrl('products/chuck-eye-steak.png'),
    map: getAssetUrl('map/dark-map-bg.jpg'),
    fries: getAssetUrl(`ui/${UI_ICON_FILES.fries}`),
    drink: getAssetUrl(`ui/${UI_ICON_FILES.drink}`),
    location: getAssetUrl(`ui/${UI_ICON_FILES.location}`),
    clock: getAssetUrl(`ui/${UI_ICON_FILES.clock}`),
    externalLink: getAssetUrl(`ui/${UI_ICON_FILES.externalLink}`),
    whatsapp: getAssetUrl(`ui/${UI_ICON_FILES.whatsapp}`),
  };

  const hamburguesas = sections.find((section) => section.id === 'hamburguesas');
  const agujas = sections.find((section) => section.id === 'agujas-nortenas');
  const bebidas = sections.find((section) => section.id === 'bebidas');
  const agujaItem = agujas?.items?.find((item) => item.id === 'agujas-nortenas-orden') || agujas?.items?.[0];
  const refrescoItem = bebidas?.items?.find((item) => item.id === 'refresco-400ml') || bebidas?.items?.[0];

  return (
    <main className="zg-page" id="main-content" style={pageAssetsStyle}>
      <a className="skip-link" href="#menu-sections">Saltar al men&uacute;</a>

      <HeroSection
        brandImageUrl={assetUrls.brand}
        heroImageUrl={assetUrls.hero}
        iconLocationUrl={assetUrls.location}
        iconWhatsappUrl={assetUrls.whatsapp}
        mapsUrl={mapsUrl}
        whatsappUrl={whatsappUrl}
      />

      <div className="zg-container" id="menu-sections">
        <HamburgersSection hamburguesas={hamburguesas} iconFriesUrl={assetUrls.fries} restaurant={restaurant} />
        <FeatureProduct agujaImageUrl={assetUrls.agujas} agujaItem={agujaItem} restaurant={restaurant} />
        <DrinkRow iconDrinkUrl={assetUrls.drink} refrescoItem={refrescoItem} restaurant={restaurant} />
        <VisitSection
          iconClockUrl={assetUrls.clock}
          iconExternalLinkUrl={assetUrls.externalLink}
          iconLocationUrl={assetUrls.location}
          mapImageUrl={assetUrls.map}
          mapsUrl={mapsUrl}
          restaurant={restaurant}
          serviceHoursLabel={serviceHoursLabel}
        />
      </div>

      <StickyCTA iconWhatsappUrl={assetUrls.whatsapp} whatsappUrl={whatsappUrl} />

      <footer className="zg-container zg-footer-meta" aria-label="Menu release traceability">
        <p>Menu v{menuVersion}</p>
        <p>Actualizado: {publishedAt}</p>
        <p>Commit: {releaseCommit}</p>
      </footer>
    </main>
  );
}







