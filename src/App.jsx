import { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuSection from './components/MenuSection';
import WhatsAppCTA from './components/WhatsAppCTA';
import './styles/App.css';

export default function App() {
  const [tableId, setTableId] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Parse table ID from URL params (?t=01)
    const params = new URLSearchParams(window.location.search);
    const t = params.get('t');
    if (t) setTableId(t);

    async function loadPublicMenu() {
      try {
        setLoading(true);
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
    }

    loadPublicMenu();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <main className="menu-container">
          <p>Cargando menu...</p>
        </main>
      </div>
    );
  }

  if (error || !menuData) {
    return (
      <div className="app">
        <main className="menu-container">
          <p>No fue posible cargar el menu.</p>
          <p>{error}</p>
        </main>
      </div>
    );
  }

  const { restaurant, categories, items } = menuData;

  // Group items by category
  const itemsByCategory = [...categories]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((category) => ({
    ...category,
    items: items
      .filter((item) => item.categoryId === category.id)
      .sort((a, b) => a.sortOrder - b.sortOrder),
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
