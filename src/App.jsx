import { useState, useEffect } from 'react';
import menuData from './data/menuData.json';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import WhatsAppCTA from './components/WhatsAppCTA';
import './styles/App.css';

export default function App() {
  const [tableId, setTableId] = useState(null);

  useEffect(() => {
    // Parse table ID from URL params (?t=01)
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t');
    if (t) setTableId(t);
  }, []);

  const { restaurant, categories, items } = menuData;

  // Group items by category
  const itemsByCategory = categories.map((category) => ({
    ...category,
    items: items.filter((item) => item.categoryId === category.id),
  }));

  return (
    <div className="app">
      <Header restaurant={restaurant} tableId={tableId} />

      <main className="menu-container">
        {itemsByCategory.map((category) => (
          <MenuSection
            key={category.id}
            category={category}
            items={category.items}
            restaurant={restaurant}
          />
        ))}
      </main>

      <WhatsAppCTA
        restaurant={restaurant}
        tableId={tableId}
      />
    </div>
  );
}
