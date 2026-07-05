import ItemCard from './ItemCard';
import './MenuSection.css';

export default function MenuSection({ category, items, restaurant }) {
  // Filter available items
  const availableItems = items.filter((item) => item.availability?.isAvailable !== false);

  if (availableItems.length === 0) return null;

  return (
    <section className="menu-section">
      <h2 className="section-title">{category.name}</h2>
      <div className="items-grid">
        {availableItems.map((item) => (
          <ItemCard key={item.id} item={item} restaurant={restaurant} />
        ))}
      </div>
    </section>
  );
}
