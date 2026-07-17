import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "scripts", "qr-standard.json");
const outputDir = path.join(rootDir, "artifacts", "qr", "tables");
const printDir = path.join(rootDir, "artifacts", "qr", "print");
const manifestPath = path.join(rootDir, "artifacts", "qr", "manifest.json");
const labelsPath = path.join(rootDir, "artifacts", "qr", "labels.json");
const printSheetPath = path.join(printDir, "labels-a4.html");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function resetDir(dirPath) {
  fs.rmSync(dirPath, { recursive: true, force: true });
  ensureDir(dirPath);
}

function tableCode(prefix, number) {
  return `${prefix}${String(number).padStart(2, "0")}`;
}

function tableUrl(baseUrl, param, tableId) {
  const normalized = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalized}?${param}=${encodeURIComponent(tableId)}`;
}

function buildBaseTableIds(config) {
  const ids = [];
  for (let i = config.tableStart; i <= config.tableEnd; i += 1) {
    ids.push(tableCode(config.tablePrefix, i));
  }
  return ids;
}

function buildLifecyclePlan(config) {
  const lifecycle = config.tableLifecycle || {};
  const activeIds = new Set(buildBaseTableIds(config));
  const deactivated = new Set();
  const renamed = [];

  if (Array.isArray(lifecycle.activate)) {
    for (const tableId of lifecycle.activate) {
      if (typeof tableId === "string" && tableId.trim()) {
        activeIds.add(tableId.trim());
      }
    }
  }

  if (Array.isArray(lifecycle.deactivate)) {
    for (const tableId of lifecycle.deactivate) {
      if (typeof tableId === "string" && tableId.trim()) {
        const normalized = tableId.trim();
        activeIds.delete(normalized);
        deactivated.add(normalized);
      }
    }
  }

  const rename = lifecycle.rename || {};
  for (const [fromIdRaw, toIdRaw] of Object.entries(rename)) {
    const fromId = String(fromIdRaw || "").trim();
    const toId = String(toIdRaw || "").trim();
    if (!fromId || !toId) continue;
    if (!activeIds.has(fromId)) continue;
    activeIds.delete(fromId);
    activeIds.add(toId);
    renamed.push({ from: fromId, to: toId });
  }

  const ordered = Array.from(activeIds).sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  return {
    activeIds: ordered,
    deactivated: Array.from(deactivated).sort((a, b) => a.localeCompare(b, "en", { numeric: true })),
    renamed,
  };
}

function toFileToken(tableId) {
  return tableId.toLowerCase().replace(/[^a-z0-9-]+/g, "-");
}

function buildPrintSheet({ restaurantName, cards, printLabel, targetPhysicalSizeMm }) {
  const cardMarkup = cards
    .map(
      (card) => `
      <article class="label-card">
        <h2>${card.tableId}</h2>
        <img src="../tables/${card.fileName}" alt="QR ${card.tableId}" />
        <p class="label-copy">${printLabel}</p>
        <p class="label-url">${card.url}</p>
      </article>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${restaurantName} QR Labels</title>
  <style>
    :root {
      --qr-size: ${targetPhysicalSizeMm}mm;
      --label-gap: 6mm;
      --line: #d6d6d6;
      --text: #1a1a1a;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      padding: 10mm;
      color: var(--text);
      font-family: Arial, sans-serif;
      background: #fff;
    }

    .sheet {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--label-gap);
    }

    .label-card {
      border: 1px solid var(--line);
      border-radius: 4mm;
      padding: 4mm;
      text-align: center;
      page-break-inside: avoid;
    }

    .label-card h2 {
      margin: 0 0 2mm;
      font-size: 4.2mm;
      letter-spacing: 0.2mm;
    }

    .label-card img {
      width: var(--qr-size);
      height: var(--qr-size);
      object-fit: contain;
      margin: 0 auto;
      display: block;
    }

    .label-copy {
      margin: 2.5mm 0 0;
      font-size: 3.3mm;
      font-weight: 600;
    }

    .label-url {
      margin: 2mm 0 0;
      font-size: 2.2mm;
      color: #555;
      word-break: break-all;
    }

    @media print {
      body {
        padding: 6mm;
      }
    }
  </style>
</head>
<body>
  <main class="sheet">
${cardMarkup}
  </main>
</body>
</html>`;
}

async function generate() {
  if (!fs.existsSync(configPath)) {
    throw new Error("Missing QR standard config at scripts/qr-standard.json");
  }

  const configRaw = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(configRaw);

  resetDir(outputDir);
  resetDir(printDir);
  ensureDir(path.dirname(manifestPath));

  const lifecyclePlan = buildLifecyclePlan(config);
  const printConfig = config.print || {};
  const printLabel = printConfig.label || "Scan to view menu";
  const targetPhysicalSizeMm = Number(printConfig.targetPhysicalSizeMm) > 0
    ? Number(printConfig.targetPhysicalSizeMm)
    : 40;

  const manifest = {
    generatedAt: new Date().toISOString(),
    standard: config,
    lifecycle: lifecyclePlan,
    tables: [],
    package: {
      labelsJson: "artifacts/qr/labels.json",
      printSheetHtml: "artifacts/qr/print/labels-a4.html",
    },
  };

  const labelCards = [];

  for (const tableId of lifecyclePlan.activeIds) {
    const url = tableUrl(config.menuBaseUrl, config.tableParam, tableId);
    const fileToken = toFileToken(tableId);
    const baseName = `table-${fileToken}`;
    const svgPath = path.join(outputDir, `${baseName}.svg`);
    const pngPath = path.join(outputDir, `${baseName}.png`);

    const qrOptions = {
      margin: config.margin,
      errorCorrectionLevel: config.errorCorrectionLevel,
      color: {
        dark: config.darkColor,
        light: config.lightColor
      }
    };

    if (config.svg?.enabled) {
      const svg = await QRCode.toString(url, { ...qrOptions, type: "svg" });
      fs.writeFileSync(svgPath, svg, "utf-8");
    }

    if (config.png?.enabled) {
      await QRCode.toFile(pngPath, url, {
        ...qrOptions,
        width: config.png.width
      });
    }

    manifest.tables.push({
      tableId,
      url,
      files: {
        svg: config.svg?.enabled ? `artifacts/qr/tables/${baseName}.svg` : null,
        png: config.png?.enabled ? `artifacts/qr/tables/${baseName}.png` : null
      }
    });

    if (config.png?.enabled) {
      labelCards.push({
        tableId,
        url,
        fileName: `${baseName}.png`,
      });
    }
  }

  const labels = {
    generatedAt: manifest.generatedAt,
    printLabel,
    targetPhysicalSizeMm,
    tableCount: labelCards.length,
    cards: labelCards,
  };

  const printSheet = buildPrintSheet({
    restaurantName: config.restaurantName || "Zentenos Grill",
    cards: labelCards,
    printLabel,
    targetPhysicalSizeMm,
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
  fs.writeFileSync(labelsPath, JSON.stringify(labels, null, 2), "utf-8");
  fs.writeFileSync(printSheetPath, printSheet, "utf-8");

  console.log(`QR generation complete: ${manifest.tables.length} active table codes.`);
}

generate().catch((error) => {
  console.error(`QR generation failed: ${error.message}`);
  process.exit(1);
});
