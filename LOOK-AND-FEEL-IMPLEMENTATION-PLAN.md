# Zenteno's Grill Menu — Look and Feel Implementation Plan

## Document Status

- **Status:** Visual assets approved
- **Current workflow gate:** `READY_FOR_IMPLEMENTATION`
- **Implementation state:** Ready for coding
- **Image-generation surface:** ChatGPT Web
- **Codex responsibility:** React/Vite implementation, CSS/layout, component structure, JSON integration, responsive behavior, and GitHub Pages compatibility

## Workflow Rule

Image generation and final visual-asset creation happen outside Codex in ChatGPT Web for better image-generation performance.

Codex must:

- Not generate, replace, or invent final visual assets.
- Wait until the approved images are manually added to the repository.
- Use the filenames and folder structure defined in this document.
- Confirm that required assets exist before beginning implementation.
- Preserve the existing project behavior and menu-data integration.

Implementation may begin only after the user confirms that the visual assets have been added under `public/assets/`.

## Project Goal

Build a mobile-first static QR menu with a premium dark charcoal-grill identity based on the approved mockup.

The final page should use:

- Dark wood and charcoal backgrounds.
- Aged cream typography.
- Burnt copper accents.
- Green only for WhatsApp actions.
- Rustic borders and restrained ornaments.
- Strong food photography.
- Responsive, accessible, real UI rather than one composite poster image.

## Out of Scope

Do not build:

- POS functionality.
- Cart or order-submission workflow.
- Customer login.
- New API services.
- Kitchen application.
- Wear OS application.
- Inventory management.
- VPS synchronization.
- Admin dashboard.
- Payment or table-session functionality.

## Required Asset Structure

Final assets will be prepared from the approved source images under:

- `C:\Users\Fernando\OneDrive\ZentenosGrill\CompanyImage\Menu`
- `C:\Users\Fernando\OneDrive\ZentenosGrill\CompanyImage\Menu\icons`

The source files must be copied, converted where required, optimized, and verified before visual implementation begins.

```text
public/
  assets/
    brand/
      zentenos-emblem.png

    hero/
      hero-grill-flame.jpg

    products/
      burger.png
      bacon-burger.png
      double-burger.png
      chuck-eye-steak.png
      promo-meat-corona.png

    textures/
      wood-bg-dark.jpg
      ember-overlay-01.png
      ember-overlay-02.png

    ui/
      divider-stars.png
      icon-whatsapp.png
      icon-location.png
      icon-clock.png
      icon-fries.png
      icon-drink.png
      icon-external-link.png

    map/
      dark-map-bg.jpg

    ASSET-MANIFEST.md
```

## Verified UI Source Assets

The following source files were found in `C:\Users\Fernando\OneDrive\ZentenosGrill\CompanyImage\Menu\icons` on July 16, 2026:

- `divider-stars.png`
- `icon-whatsapp.png`
- `icon-location.png`
- `icon-clock.png`
- `icon-fries.png`
- `icon-drink.png`
- `icon-external-link.png`

Use these PNG files as the approved UI source set. Do not substitute the obsolete SVG names previously listed in this plan. `icon-whatsapp.png` and `icon-fries.png` require a transparency and background-edge check before they are copied into the application. All UI assets require web optimization.
## Asset Source Mapping

| Source file | Final repository path | Preparation |
|---|---|---|
| `Menu/zentenos-emblem.png` | `public/assets/brand/zentenos-emblem.png` | Copy and optimize |
| `Menu/go hero-grill-flame.png` | `public/assets/hero/hero-grill-flame.jpg` | Rename, convert to JPEG, and optimize |
| `Menu/burger.png` | `public/assets/products/burger.png` | Copy and optimize |
| `Menu/bacon-burger.png` | `public/assets/products/bacon-burger.png` | Copy and optimize |
| `Menu/double-burger.png` | `public/assets/products/double-burger.png` | Copy and optimize |
| `Menu/chuck-eye-steak.png` | `public/assets/products/chuck-eye-steak.png` | Copy and optimize |
| `Menu/promo-meat-corona.png` | `public/assets/products/promo-meat-corona.png` | Copy and optimize |
| `Menu/wood-bg-dark.png` | `public/assets/textures/wood-bg-dark.jpg` | Convert to JPEG and optimize |
| `Menu/ember-overlay-01.png` | `public/assets/textures/ember-overlay-01.png` | Verify overlay behavior and optimize |
| `Menu/ember-overlay-02.png` | `public/assets/textures/ember-overlay-02.png` | Verify transparency and optimize |
| `Menu/dark-map-bg.png` | `public/assets/map/dark-map-bg.jpg` | Convert to JPEG and optimize |
| `Menu/icons/divider-stars.png` | `public/assets/ui/divider-stars.png` | Copy and optimize |
| `Menu/icons/icon-whatsapp.png` | `public/assets/ui/icon-whatsapp.png` | Verify background edges and optimize |
| `Menu/icons/icon-location.png` | `public/assets/ui/icon-location.png` | Copy and optimize |
| `Menu/icons/icon-clock.png` | `public/assets/ui/icon-clock.png` | Copy and optimize |
| `Menu/icons/icon-fries.png` | `public/assets/ui/icon-fries.png` | Verify background edges and optimize |
| `Menu/icons/icon-drink-1.png` | `public/assets/ui/icon-drink.png` | Rename to final filename and optimize |
| `Menu/icons/icon-external-link.png` | `public/assets/ui/icon-external-link.png` | Copy and optimize |

All required final assets have an identified source. Root-level icon duplicates are excluded in favor of the smaller files under `Menu/icons/`. `menu-proposal.jpg` is a visual reference only. `zentenos-grill-image.png` is currently unassigned and must not be added unless the plan gives it a specific role.
## Gap 4 Transparency and Edge QA

Reviewed on July 16, 2026. Alpha metadata and decoded visual edges were checked before optimization.

| Asset | Result | Finding |
|---|---|---|
| `textures/ember-overlay-01.png` | Pass | Corrected export has genuine transparency and clean spark edges |
| `textures/ember-overlay-02.png` | Pass | Genuine alpha range with transparent corners and usable smoke edges |
| `ui/divider-stars.png` | Pass | Corrected export has genuine transparency and clean ornamental edges |
| `ui/icon-clock.png` | Pass | Genuine transparent background and clean circular edge |
| `ui/icon-drink.png` | Pass | Replacement source `icon-drink-1.png` has genuine transparency and clean circular edges |
| `ui/icon-external-link.png` | Pass | Genuine transparent background and clean edge |
| `ui/icon-fries.png` | Pass | Corrected export has genuine transparency and clean edges |
| `ui/icon-location.png` | Pass | Corrected export has genuine transparency and clean inner and outer edges |
| `ui/icon-whatsapp.png` | Pass | Corrected export has genuine transparency and a clean circular edge |
| `brand/zentenos-emblem.png` | Pass | Corrected transparent export is clean on the dark background and optimized to `1000x563` |
| `products/burger.png` | Pass | Corrected transparent export optimized to `720x720`; clean on the dark menu background |
| `products/bacon-burger.png` | Pass | Corrected transparent export optimized to `720x720`; clean on the dark menu background |
| `products/double-burger.png` | Pass | Corrected transparent export optimized to `720x720`; clean on the dark menu background |
| `products/chuck-eye-steak.png` | Pass | Intentionally opaque dark food photograph with no checkerboard artifact |
| `products/promo-meat-corona.png` | Pass | Corrected transparent export has a restrained dark shadow and is optimized to `900x675` |
| `hero/hero-grill-flame.jpg` | Pass | JPEG conversion is visually intact with no obvious edge damage |
| `textures/wood-bg-dark.jpg` | Pass | JPEG conversion is visually intact and suitable for tiling/cropping review |
| `map/dark-map-bg.jpg` | Pass | JPEG conversion is visually intact with legible map detail |

Gap 4 passed after final dark-background review. All transparent assets have usable alpha, clean edges, and no baked checkerboard backgrounds. Intentionally opaque photographs remain visually compatible with the approved dark menu treatment.

## Asset Readiness Checklist

| Asset group | Required files | Status |
|---|---|---|
| Brand | Zenteno's emblem | Transparency and optimization passed |
| Hero | Flaming grill photograph | JPEG created; visual review and optimization pending |
| Hamburgers | Sencilla, Tocino, Doble Carne | Transparency and optimization passed |
| Agujas | Platter with fries and salsa | Visual QA passed; optimized candidate staged |
| Promotion | Meat and Corona composition | Transparency and optimization passed |
| Textures | Wood and ember overlays | Transparency passed; optimization pending |
| UI | Seven PNG icons and divider ornament | Transparency passed; optimization pending |
| Map | Dark map treatment | Visual QA passed; optimized JPEG staged |

## Gap 5 Optimization Audit

Gap 5 began after the first transparency pass. The current staged library was resized and compressed using high-quality resampling:

- UI icons: `192x192`.
- Burger images: `720x720`.
- Chuck-eye steak: `1000x563`.
- Promotion image: `900x675`.
- Brand emblem: `1000x563`.
- Smoke/ember overlay 02: `768x1152`.
- Hero JPEG: `1440x1080` at quality 85.
- Wood JPEG: `1440x921` at quality 85.
- Map JPEG: `1200x900` at quality 85.

Gap 5 passed. All 18 image assets decode successfully and the optimized library is approximately `6.73 MB`. Below-fold product and decorative assets must use lazy loading during implementation, and large overlays must not be eagerly preloaded, so the initial mobile transfer remains substantially smaller than the full library.

## Remaining Asset Preparation Tasks

- [x] Create the final `public/assets/` directory structure shown above.
- [x] Copy the verified UI source files from the `icons` source folder.
- [x] Copy and rename the approved product, brand, texture, hero, promotion, and map source files.
- [x] Convert `wood-bg-dark.png`, `go hero-grill-flame.png`, and `dark-map-bg.png` into real JPEG files using the final `.jpg` filenames; do not only change their extensions.
- [x] Verify transparency for UI icons and ember overlays, especially `icon-whatsapp.png`, `icon-fries.png`, and `ember-overlay-01.png`.
- [x] Optimize every asset for mobile delivery while preserving sufficient display quality.
- [x] Create `public/assets/ASSET-MANIFEST.md` after final filenames, formats, and locations are verified.
- [x] Confirm every manifest entry opens correctly from its final repository path.
- [x] Update implementation status only after the user confirms the prepared assets are approved.

## Page Order

1. Hero.
2. Opening promotion banner.
3. Hamburguesas cards.
4. Agujas Norteñas feature block.
5. Refrescos row.
6. Visítanos section.
7. Sticky WhatsApp CTA.

## Development Phases

### Phase 1 — Asset Verification

Before editing the application:

- Confirm every required asset folder exists.
- Record which final assets are present or missing.
- Verify filenames exactly match this document.
- Verify images open correctly and are suitable for desktop and mobile crops.
- Do not create replacement images for missing files.
- Stop and report missing required assets before proceeding.

### Phase 2 — Visual Foundation

Implement:

- Global CSS tokens.
- Dark wood and charcoal backgrounds.
- Aged cream typography.
- Burnt copper accents.
- WhatsApp green.
- Responsive containers.
- Reusable buttons.
- Reusable section-title styling.

Primary files:

- `src/styles/global.css`
- `src/styles/App.css`

Do not change menu-data behavior during this phase.

### Phase 3 — Page Layout Shell

Refactor the page into the approved mobile-first section order while preserving:

- Loading from `public/menu-public.json`.
- Availability filtering.
- The `?t=` table parameter.
- WhatsApp ordering links.
- Google Maps navigation.
- GitHub Pages base-path compatibility.
- Loading and error states.
- Menu release metadata.

Preferred component structure:

```text
src/components/
  Hero/
  PromoBanner/
  SectionTitle/
  ProductCard/
  FeatureProduct/
  DrinkRow/
  VisitSection/
  StickyCTA/
```

Implementation may begin in `App.jsx`, but duplicate legacy and replacement component systems must not remain permanently.

### Phase 4 — Hero Section

Use:

- `public/assets/hero/hero-grill-flame.jpg`
- `public/assets/brand/fire-utensils-mark.svg`
- Brand name: `Zenteno's Grill`
- Subtitle: `Asado al Carbón`
- WhatsApp action.
- Cómo llegar action.

Rules:

- Keep the hero premium, clean, dark, and rustic.
- Do not make it look like a flattened flyer.
- Do not overuse the full emblem.
- Keep brand text as real accessible text where practical.
- Provide a CSS gradient fallback if the hero image cannot load.

### Phase 5 — Promotion Banner

Content:

**Promoción de apertura**

> En la compra de cualquier hamburguesa, recibe de cortesía una aguja norteña o una Corona 210 ml.

Optional image:

- `public/assets/products/promo-meat-corona.png`

If the asset cannot load, keep the copy and layout usable without showing a broken image.

### Phase 6 — Hamburger Product Cards

Build cards from `menu-public.json`.

Each card shows:

- Product image.
- Product name.
- JSON-driven price.
- Short description.
- Includes-fries line.

Do not prominently display long ingredient lists or allergens in the primary card layout.

Asset mapping:

```js
const PRODUCT_IMAGES = {
  burger: "burger.png",
  "bacon-burger": "bacon-burger.png",
  "double-burger": "double-burger.png",
  "chuck-eye-steak": "chuck-eye-steak.png",
  sencilla: "burger.png",
  tocino: "bacon-burger.png",
  "doble-carne": "double-burger.png",
  "agujas-nortenas-orden": "chuck-eye-steak.png",
};
```

Expected folder:

- `public/assets/products/`

Missing images must degrade to a styled dark placeholder without showing a browser broken-image icon.

### Phase 7 — Agujas Norteñas Feature

Create a wide premium feature block distinct from the hamburger cards.

Show:

- Agujas image.
- Product title.
- JSON-driven price information.
- `Orden de 250 g` as the primary display.
- Short description.

Image:

- `public/assets/products/chuck-eye-steak.png`

The existing `500 g` variation must not be silently deleted from menu data. Its final UI treatment should remain secondary to the approved 250 g presentation.

### Phase 8 — Refrescos Row

Create a compact row showing:

- Refrescos icon.
- `Refrescos`.
- `400 ml`.
- Short description.
- JSON-driven price.

The current JSON item ID is `refresco-400ml`.

No product photograph is required.

### Phase 9 — Visítanos Section

Show:

- Address from restaurant data.
- Schedule.
- Phone number.
- Dark map treatment.
- Google Maps action.

Map asset:

- `public/assets/map/dark-map-bg.jpg`

Google Maps URL:

```text
https://maps.app.goo.gl/FTpkE4GnUgbMzyzT7
```

If the map asset cannot load, use a dark styled block with a location-pin treatment.

Do not publish a placeholder address as a real restaurant address.

### Phase 10 — Sticky WhatsApp CTA

Requirements:

- Remain visible on mobile.
- Avoid covering menu content.
- Add sufficient page bottom padding.
- Use a centered limited width on desktop.
- Display `Ordenar por WhatsApp`.

WhatsApp number:

```text
527775041335
```

Default message:

```text
Hola, quiero ordenar en Zenteno's Grill.
```

Message with table parameter:

```text
Hola, quiero ordenar en Zenteno's Grill. Mesa: {tableId}
```

## Data and Coding Rules

- Keep using `public/menu-public.json`.
- Do not hardcode prices already present in JSON.
- Preserve existing availability and sort-order behavior.
- Use shorter presentation copy only when necessary for card readability.
- Keep the existing GitHub Pages base path working.
- Build public asset URLs with `import.meta.env.BASE_URL`.
- Do not add unrelated functionality.
- Do not overwrite existing user changes unrelated to this redesign.

Example asset URL:

```js
const fileName = PRODUCT_IMAGES[item.id];
const imageUrl = `${import.meta.env.BASE_URL}assets/products/${fileName}`;
```

## Missing-Asset Behavior

If an image fails to load:

- Hide the broken image element.
- Show a dark gradient or styled placeholder.
- Optionally show the product name.
- Preserve the element's intended aspect ratio.
- Keep all text and actions readable.

Codex must not generate a substitute image.

## Responsive Rules

The QR menu is mobile-first.

Prioritize:

- Fast loading.
- Clear prices.
- Large touch-friendly actions.
- Easy vertical scrolling.
- Strong contrast.
- No oversized logo.
- No essential information hidden behind interaction.
- No sticky CTA overlap.

Above the fold should communicate:

- Zenteno's Grill.
- Asado al Carbón.
- WhatsApp action.
- Cómo llegar action.

Desktop should preserve the approved wide hero and multi-column product presentation without treating the entire page as one fixed poster.

## Content Rules

### Hamburguesas

**Sencilla**

Carne marinada con nuestra receta especial y cocinada al carbón con queso Monterey Jack, lechuga, jitomate, cebolla y pepinillos.

**Tocino**

Nuestra hamburguesa al carbón acompañada de tocino crujiente, queso Monterey Jack, lechuga, jitomate, cebolla y pepinillos.

**Doble Carne**

Dos jugosas porciones de carne marinada y asada al carbón con queso Monterey Jack, lechuga, jitomate, cebolla y pepinillos.

### Agujas

Jugosas agujas de res con hueso, marinadas con nuestra mezcla especial y asadas lentamente al carbón. Acompañadas de papas fritas y salsa de chile habanero.

### Refrescos

**Refrescos 400 ml**

Bebidas frías variadas: Coca-Cola, Sprite, Fanta, Agua mineral.

## Design Acceptance Criteria

Implementation is acceptable when:

- The page looks close to the approved mockup.
- Mobile layout is strong and readable.
- Desktop layout is balanced and responsive.
- WhatsApp action works.
- Google Maps action works.
- Menu content loads from JSON.
- Prices remain clear.
- Product cards remain readable.
- Missing images do not break the UI.
- CTA does not cover content.
- Food images can be replaced without component rewrites.
- GitHub Pages base paths continue working.
- No POS, cart, or unrelated application complexity is added.

## Implementation Start Checklist

Codex must verify all of the following before starting:

- [x] User explicitly confirms visual assets were added.
- [x] Required `public/assets/` folders exist.
- [x] Required filenames match this plan.
- [x] Hero image is present.
- [x] Three hamburger images are present.
- [x] Agujas image is present.
- [x] Promotion image is present or explicitly waived.
- [x] Brand mark is present.
- [x] Approved UI source filenames are identified.
- [x] Texture and UI assets are present or explicitly waived.
- [x] Map treatment is present or explicitly waived.
- [x] Production restaurant address is confirmed: `Bo. de Los Arcos 2, Las Fincas, Jiutepec, Mor.`
- [x] Working tree is inspected before edits; preserve all existing user changes.

Until these conditions are satisfied, the correct action is to wait for the assets and avoid implementation changes.

## Future Codex Prompt

```text
We are implementing the approved Zenteno's Grill QR menu look and feel.

Before editing code, read LOOK-AND-FEEL-IMPLEMENTATION-PLAN.md completely.

Image generation and visual-asset creation happen outside Codex in ChatGPT Web. Do not generate or invent final images. Confirm that required assets exist under public/assets/ before beginning.

Use the existing React/Vite project and continue loading data from public/menu-public.json. Preserve the ?t= table parameter, WhatsApp links, Google Maps link, availability filtering, GitHub Pages base path, loading/error states, and menu release metadata.

Do not build POS, cart, order submission, login, new APIs, kitchen tools, inventory, VPS sync, or admin functionality.

Implement the page in this order:
1. Hero
2. Promotion banner
3. Hamburguesas cards
4. Agujas Norteñas feature
5. Refrescos row
6. Visítanos section
7. Sticky WhatsApp CTA

The final result must be responsive real UI inspired by the approved mockup, not one flattened poster image.
```
