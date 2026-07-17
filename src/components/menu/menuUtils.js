export const MAPS_URL = 'https://maps.app.goo.gl/FTpkE4GnUgbMzyzT7';

export const PRODUCT_IMAGES = {
  burger: 'burger.png',
  'bacon-burger': 'bacon-burger.png',
  'double-burger': 'double-burger.png',
  'chuck-eye-steak': 'chuck-eye-steak.png',
  sencilla: 'burger.png',
  tocino: 'bacon-burger.png',
  'doble-carne': 'double-burger.png',
  'agujas-nortenas-orden': 'chuck-eye-steak.png',
};

export const PRODUCT_SHORT_COPY = {
  sencilla: 'Carne marinada al carb\u00f3n con queso Monterey Jack, lechuga, jitomate, cebolla y pepinillos.',
  tocino: 'Hamburguesa al carb\u00f3n con tocino crujiente, queso Monterey Jack y vegetales frescos.',
  'doble-carne': 'Dos porciones de carne marinada al carb\u00f3n con queso Monterey Jack y vegetales frescos.',
  'agujas-nortenas-orden':
    'Jugosas agujas de res con hueso, marinadas y asadas lentamente al carb\u00f3n con papas fritas y salsa habanero.',
  'refresco-400ml': 'Bebidas fr\u00edas variadas: Coca-Cola, 7-up, Squirt, Pepsi, Mirinda y agua mineral.',
};

export const UI_ICON_FILES = {
  fries: 'icon-fries.png',
  drink: 'icon-drink.png',
  location: 'icon-location.png',
  clock: 'icon-clock.png',
  externalLink: 'icon-external-link.png',
  whatsapp: 'icon-whatsapp.png',
};

export function getAssetUrl(path) {
  return `${import.meta.env.BASE_URL}assets/${path}`;
}

export function getPageAssetsStyle() {
  return {
    '--zg-wood-bg': `url("${getAssetUrl('textures/wood-bg-dark.jpg')}")`,
    '--zg-ember-bg': `url("${getAssetUrl('textures/ember-overlay-01.png')}")`,
  };
}

export function formatPrice(price, currency = 'MXN') {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatUpdatedAt(value) {
  if (!value) return 'Fecha no disponible';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'UTC',
  }).format(parsed);
}

export function getWhatsAppUrl(phone, tableId) {
  const digits = String(phone || '').replace(/\D/g, '');
  const cleanPhone = digits.length === 10 ? `52${digits}` : digits;
  const message = tableId
    ? `Hola, quiero ordenar en Zenteno's Grill. Mesa: ${tableId}`
    : "Hola, quiero ordenar en Zenteno's Grill.";

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getPrimaryPriceVariation(item, variationId) {
  return item?.priceVariations?.find((variation) => variation.id === variationId) || null;
}

export function getIncludesFriesLine(item) {
  const friesText = item?.includes?.find((entry) => /papas|fries/i.test(entry));
  return friesText || 'Incluye papas a la francesa';
}

function formatTimeLabel(value) {
  const [hourValue, minuteValue = '00'] = String(value).split(':');
  const hour = Number(hourValue);
  if (!Number.isFinite(hour)) return value;
  const period = hour >= 12 ? 'PM' : 'AM';
  const normalizedHour = hour % 12 || 12;
  return `${normalizedHour}:${minuteValue.padStart(2, '0')} ${period}`;
}

export function formatServiceHours(serviceHours) {
  if (!Array.isArray(serviceHours)) {
    return 'Viernes y s\u00e1bado de 6:00 PM a 10:00 PM';
  }

  const openDays = serviceHours.filter((day) => day.isOpen);
  if (!openDays.length) {
    return 'Horario por confirmar';
  }

  const dayMap = {
    Friday: 'Viernes',
    Saturday: 's\u00e1bado',
  };

  const days = openDays
    .map((day) => dayMap[day.dayOfWeek] || day.dayOfWeek)
    .join(' y ');
  const first = openDays[0];
  const start = formatTimeLabel(first.openTime || '18:00');
  const end = formatTimeLabel(first.closeTime || '22:00');

  return `${days} ${start} a ${end}`;
}


