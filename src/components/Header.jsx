import './Header.css';

export default function Header({ restaurant, tableId }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="restaurant-name">{restaurant.name}</h1>
          <p className="tagline">{restaurant.tagline}</p>
        </div>
        {tableId && (
          <div className="table-badge">
            Mesa {tableId}
          </div>
        )}
      </div>
    </header>
  );
}
