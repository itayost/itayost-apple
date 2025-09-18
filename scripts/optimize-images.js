const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const SIZES = {
  // Original size for desktop
  desktop: { width: 757, height: 519 },
  // Actual display size
  display: { width: 391, height: 268 },
  // Mobile size
  mobile: { width: 320, height: 220 },
  // Thumbnail
  thumbnail: { width: 200, height: 137 }
};

async function optimizeImage(inputPath, filename) {
  const nameWithoutExt = path.basename(filename, path.extname(filename));

  console.log(`Processing ${filename}...`);

  // Create WebP versions for each size
  for (const [sizeName, dimensions] of Object.entries(SIZES)) {
    const outputPath = path.join(IMAGES_DIR, `${nameWithoutExt}-${sizeName}.webp`);

    await sharp(inputPath)
      .resize(dimensions.width, dimensions.height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);

    const stats = await fs.stat(outputPath);
    console.log(`  ✓ Created ${nameWithoutExt}-${sizeName}.webp (${(stats.size / 1024).toFixed(1)}KB)`);
  }

  // Also create a high-quality WebP at original size for fallback
  const originalWebP = path.join(IMAGES_DIR, `${nameWithoutExt}.webp`);
  await sharp(inputPath)
    .webp({
      quality: 90,
      effort: 6
    })
    .toFile(originalWebP);

  const originalStats = await fs.stat(originalWebP);
  console.log(`  ✓ Created ${nameWithoutExt}.webp original (${(originalStats.size / 1024).toFixed(1)}KB)`);
}

async function main() {
  try {
    const files = await fs.readdir(IMAGES_DIR);
    const pngFiles = files.filter(file =>
      file.endsWith('.png') &&
      !file.includes('-') && // Skip already processed files
      ['AmosKitchen.png', 'LolaMartin.png', 'TalNadlan.png', 'TheFader.png'].includes(file)
    );

    console.log(`Found ${pngFiles.length} PNG files to optimize\n`);

    for (const file of pngFiles) {
      const inputPath = path.join(IMAGES_DIR, file);
      await optimizeImage(inputPath, file);
      console.log('');
    }

    console.log('✅ All images optimized successfully!');

    // Show total savings
    let totalOriginal = 0;
    let totalOptimized = 0;

    for (const file of pngFiles) {
      const originalPath = path.join(IMAGES_DIR, file);
      const optimizedPath = path.join(IMAGES_DIR, `${path.basename(file, '.png')}-display.webp`);

      const originalStats = await fs.stat(originalPath);
      const optimizedStats = await fs.stat(optimizedPath);

      totalOriginal += originalStats.size;
      totalOptimized += optimizedStats.size;
    }

    const savings = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
    console.log(`\n📊 Total savings: ${savings}% reduction in file size`);
    console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Optimized: ${(totalOptimized / 1024).toFixed(1)}KB`);

  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

main();