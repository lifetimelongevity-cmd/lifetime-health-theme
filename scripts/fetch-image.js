require('dotenv').config();
const fs = require('fs');
const path = require('path');

const query = process.argv[2];
const filename = process.argv[3];

if (!query || !filename) {
  console.error('Usage: node scripts/fetch-image.js "search query" filename.jpg');
  process.exit(1);
}

if (!process.env.UNSPLASH_ACCESS_KEY) {
  console.error('Missing UNSPLASH_ACCESS_KEY in .env');
  process.exit(1);
}

const outputPath = path.join('./assets', filename);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

console.log(`Searching Unsplash for: "${query}"...`);

fetch(searchUrl)
  .then((res) => {
    if (!res.ok) {
      console.error(`Unsplash API returned ${res.status}`);
      process.exit(1);
    }
    return res.json();
  })
  .then((json) => {
    if (!json.results || json.results.length === 0) {
      console.error('No images found for that query.');
      process.exit(1);
    }

    const image = json.results[0];
    const imageUrl = image.urls.regular;
    const photographer = image.user.name;

    console.log(`Found image by: ${photographer}`);
    console.log(`Downloading...`);

    return fetch(imageUrl).then((res) => {
      if (!res.ok) {
        console.error(`Image download failed with status ${res.status}`);
        process.exit(1);
      }
      return res.arrayBuffer().then((buffer) => ({ buffer, photographer }));
    });
  })
  .then(({ buffer, photographer }) => {
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`Saved to: ${outputPath}`);
    console.log(`Credit: Photo by ${photographer} on Unsplash`);
  })
  .catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
  });