const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sharedCssPath = path.join(rootDir, 'assets', 'crs-section-headings.css');
const sectionsDir = path.join(rootDir, 'sections');

const errors = [];

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getBlock(css, selector) {
  const pattern = new RegExp(`${escapeRegExp(selector)}\\s*\\{([\\s\\S]*?)\\n\\}`, 'm');
  const match = css.match(pattern);

  if (!match) {
    errors.push(`Missing selector in shared heading CSS: ${selector}`);
    return '';
  }

  return match[1];
}

function getProperty(block, propertyName) {
  const pattern = new RegExp(`${escapeRegExp(propertyName)}\\s*:\\s*([^;]+);`);
  const match = block.match(pattern);
  return match ? match[1].trim() : null;
}

function compareProperties(selectorA, selectorB, properties) {
  const css = readFile(sharedCssPath);
  const blockA = getBlock(css, selectorA);
  const blockB = getBlock(css, selectorB);

  properties.forEach((propertyName) => {
    const valueA = getProperty(blockA, propertyName);
    const valueB = getProperty(blockB, propertyName);

    if (!valueA || !valueB) {
      errors.push(
        `Missing ${propertyName} in shared heading CSS for ${selectorA} or ${selectorB}`
      );
      return;
    }

    if (valueA !== valueB) {
      errors.push(
        `Shared heading contract broken: ${propertyName} differs between ${selectorA} (${valueA}) and ${selectorB} (${valueB})`
      );
    }
  });
}

function getLtCrsSectionPaths() {
  return fs
    .readdirSync(sectionsDir)
    .filter((fileName) => /^(lt-|crs-).+\.liquid$/.test(fileName))
    .map((fileName) => path.join(sectionsDir, fileName));
}

function checkLtCrsSections() {
  const legacyPatterns = [
    {
      label: 'legacy snippet render',
      regex: /render\s+['"]section-heading['"]/,
    },
    {
      label: 'legacy section-heading class',
      regex: /section-heading(?:__|--|["'\s])/,
    },
  ];

  getLtCrsSectionPaths().forEach((filePath) => {
    const content = readFile(filePath);
    const relativePath = path.relative(rootDir, filePath);

    legacyPatterns.forEach(({ label, regex }) => {
      if (regex.test(content)) {
        errors.push(`${relativePath} uses ${label}; LT-/CRS-sections must use crs-heading-stack.`);
      }
    });

  });
}

compareProperties(
  '.crs-heading-stack .crs-heading-stack__title',
  '.crs-heading-stack .crs-heading-stack__subtitle',
  ['font-size', 'font-weight', 'line-height']
);

compareProperties(
  '.crs-heading-stack.crs-heading-stack--headline-lg .crs-heading-stack__title',
  '.crs-heading-stack.crs-heading-stack--headline-lg .crs-heading-stack__subtitle',
  ['font-size', 'line-height']
);

checkLtCrsSections();

if (errors.length > 0) {
  console.error('Heading system check failed:');
  errors.forEach((error) => {
    console.error(`- ${error}`);
  });
  process.exit(1);
}

console.log('Heading system check passed.');
