import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "scripts", "qr-standard.json");
const outputDir = path.join(rootDir, "public", "qr", "tables");
const manifestPath = path.join(rootDir, "public", "qr", "manifest.json");

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function tableCode(prefix, number) {
  return `${prefix}${String(number).padStart(2, "0")}`;
}

function tableUrl(baseUrl, param, tableId) {
  const normalized = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return `${normalized}?${param}=${encodeURIComponent(tableId)}`;
}

async function generate() {
  if (!fs.existsSync(configPath)) {
    throw new Error("Missing QR standard config at scripts/qr-standard.json");
  }

  const configRaw = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(configRaw);

  ensureDir(outputDir);
  ensureDir(path.dirname(manifestPath));

  const manifest = {
    generatedAt: new Date().toISOString(),
    standard: config,
    tables: []
  };

  for (let i = config.tableStart; i <= config.tableEnd; i += 1) {
    const tableId = tableCode(config.tablePrefix, i);
    const url = tableUrl(config.menuBaseUrl, config.tableParam, tableId);
    const baseName = `table-${tableId.toLowerCase()}`;
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
        svg: config.svg?.enabled ? `qr/tables/${baseName}.svg` : null,
        png: config.png?.enabled ? `qr/tables/${baseName}.png` : null
      }
    });
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");
  console.log(`QR generation complete: ${manifest.tables.length} table codes.`);
}

generate().catch((error) => {
  console.error(`QR generation failed: ${error.message}`);
  process.exit(1);
});
