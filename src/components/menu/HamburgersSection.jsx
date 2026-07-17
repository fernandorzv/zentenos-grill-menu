import ProductCard from './ProductCard';

export default function HamburgersSection({ hamburguesas, iconFriesUrl, restaurant }) {
  const items = hamburguesas?.items || [];

  if (!items.length) return null;

  return (
    <section className="zg-menu-section zg-menu-section--burgers" id="hamburguesas" aria-labelledby="hamburguesas-title">
      <h2 className="zg-section-title" id="hamburguesas-title">Hamburguesas</h2>
      <div className="zg-shell-grid" role="list">
        {items.map((item) => (
          <ProductCard key={item.id} iconFriesUrl={iconFriesUrl} item={item} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}
