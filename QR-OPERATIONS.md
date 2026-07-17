# QR Operations Guide

This project generates print-ready QR assets for tables from `scripts/qr-standard.json`.

## Commands

- `npm run qr:generate`: Generate table QR images, manifest, labels manifest, and printable sheet.
- `npm run qr:print`: Alias for QR generation when preparing print packages.

## Outputs (not committed)

All generated assets are written under `artifacts/qr/` and are ignored by git.

- `artifacts/qr/manifest.json`: Main generation manifest and lifecycle summary.
- `artifacts/qr/labels.json`: Print card package descriptor.
- `artifacts/qr/print/labels-a4.html`: Printable A4 sheet for table labels.
- `artifacts/qr/tables/*.png` and `artifacts/qr/tables/*.svg`: QR image files.

## Table Lifecycle Rules

Configure lifecycle in `scripts/qr-standard.json` under `tableLifecycle`.

- `activate`: Add explicit table IDs to include (for example `"BAR01"`).
- `deactivate`: Exclude table IDs from generation.
- `rename`: Replace one table ID with another (for example `"T12": "VIP01"`).

Example:

```json
"tableLifecycle": {
  "activate": ["BAR01"],
  "deactivate": ["T09", "T10"],
  "rename": {
    "T12": "VIP01"
  }
}
```

## Print Settings

Configure print layout using:

- `print.targetPhysicalSizeMm`: QR size in millimeters.
- `print.label`: Text shown below each QR.

The printable HTML loads QR PNGs using relative paths and is designed for A4 sheet output.
