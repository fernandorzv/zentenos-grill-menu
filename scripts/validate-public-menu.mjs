import fs from "node:fs";
import path from "node:path";

const MENU_PATH = path.resolve("public", "menu-public.json");

function fail(errors) {
  console.error("Public menu validation failed:\n");
  errors.forEach((err) => console.error(`- ${err}`));
  process.exit(1);
}

function warn(warnings) {
  if (warnings.length === 0) return;
  console.warn("Public menu validation warnings:\n");
  warnings.forEach((msg) => console.warn(`- ${msg}`));
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function requireField(obj, fieldPath, errors) {
  const parts = fieldPath.split(".");
  let current = obj;
  for (const part of parts) {
    if (!current || !(part in current)) {
      errors.push(`Missing required field: ${fieldPath}`);
      return undefined;
    }
    current = current[part];
  }
  return current;
}

function ensureUniqueIds(list, label, errors) {
  const seen = new Set();
  for (const item of list) {
    if (!isNonEmptyString(item.id)) {
      errors.push(`${label} has item without valid id`);
      continue;
    }
    if (seen.has(item.id)) {
      errors.push(`Duplicate ${label} id: ${item.id}`);
      continue;
    }
    seen.add(item.id);
  }
}

function validateMenu(menu) {
  const errors = [];
  const warnings = [];

  requireField(menu, "version", errors);
  requireField(menu, "lastUpdated", errors);
  requireField(menu, "effectiveDate", errors);

  const governance = requireField(menu, "contentGovernance", errors);
  if (governance) {
    const status = requireField(governance, "status", errors);
    const owner = requireField(governance, "owner", errors);
    const approvedBy = requireField(governance, "approvedBy", errors);
    const approvedAt = requireField(governance, "approvedAt", errors);

    if (status !== "locked") {
      errors.push("contentGovernance.status must be 'locked' for production menu");
    }
    if (!isNonEmptyString(owner)) errors.push("contentGovernance.owner must be a non-empty string");
    if (!isNonEmptyString(approvedBy)) errors.push("contentGovernance.approvedBy must be a non-empty string");
    if (!isNonEmptyString(approvedAt)) errors.push("contentGovernance.approvedAt must be a non-empty string");
  }

  const restaurant = requireField(menu, "restaurant", errors);
  if (restaurant) {
    ["id", "name", "phone", "whatsappNumber", "currency"].forEach((field) => {
      const value = requireField(restaurant, field, errors);
      if (value !== undefined && !isNonEmptyString(String(value))) {
        errors.push(`restaurant.${field} must be non-empty`);
      }
    });

    if (restaurant.address === "[Your restaurant address]") {
      warnings.push("restaurant.address still contains placeholder value");
    }

    if (!Array.isArray(restaurant.serviceHours) || restaurant.serviceHours.length !== 7) {
      errors.push("restaurant.serviceHours must include exactly 7 day entries");
    }
  }

  const categories = requireField(menu, "categories", errors);
  const items = requireField(menu, "items", errors);

  if (!Array.isArray(categories) || categories.length === 0) {
    errors.push("categories must be a non-empty array");
  }
  if (!Array.isArray(items) || items.length === 0) {
    errors.push("items must be a non-empty array");
  }

  if (Array.isArray(categories)) {
    ensureUniqueIds(categories, "category", errors);
    categories.forEach((category) => {
      if (!isNonEmptyString(category.name)) errors.push(`category ${category.id} has empty name`);
      if (typeof category.sortOrder !== "number") errors.push(`category ${category.id} sortOrder must be a number`);
    });
  }

  const categoryIds = new Set(Array.isArray(categories) ? categories.map((c) => c.id) : []);

  if (Array.isArray(items)) {
    ensureUniqueIds(items, "item", errors);
    items.forEach((item) => {
      if (!isNonEmptyString(item.name)) errors.push(`item ${item.id} has empty name`);
      if (!isNonEmptyString(item.description)) errors.push(`item ${item.id} has empty description`);
      if (typeof item.price !== "number" || item.price < 0) errors.push(`item ${item.id} has invalid price`);
      if (!categoryIds.has(item.categoryId)) errors.push(`item ${item.id} references unknown categoryId ${item.categoryId}`);
      if (typeof item.sortOrder !== "number") errors.push(`item ${item.id} sortOrder must be a number`);

      if (!item.availability || typeof item.availability.isAvailable !== "boolean") {
        errors.push(`item ${item.id} must include availability.isAvailable`);
      }

      if (!Array.isArray(item.allergens)) {
        errors.push(`item ${item.id} allergens must be an array`);
      }

      if (item.priceVariations) {
        if (!Array.isArray(item.priceVariations) || item.priceVariations.length === 0) {
          errors.push(`item ${item.id} priceVariations must be a non-empty array when present`);
        } else {
          ensureUniqueIds(item.priceVariations, `priceVariation for item ${item.id}`, errors);
        }
      }
    });
  }

  return { errors, warnings };
}

if (!fs.existsSync(MENU_PATH)) {
  fail([`File not found: ${MENU_PATH}`]);
}

const raw = fs.readFileSync(MENU_PATH, "utf-8");
let parsed;
try {
  parsed = JSON.parse(raw);
} catch (err) {
  fail([`menu-public.json is not valid JSON: ${err.message}`]);
}

const { errors, warnings } = validateMenu(parsed);
warn(warnings);
if (errors.length > 0) {
  fail(errors);
}

console.log("Public menu validation passed.");
