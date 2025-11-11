#!/usr/bin/env node

/**
 * SEO Validation Script
 * Checks structured data and meta tags in built pages
 *
 * Usage: node scripts/validate-seo.js
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateStructuredData(htmlContent, pageName) {
  log(`\n📄 Validating: ${pageName}`, 'blue');

  // Extract JSON-LD scripts
  const jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const matches = [...htmlContent.matchAll(jsonLdRegex)];

  if (matches.length === 0) {
    log('  ❌ No structured data found!', 'red');
    return false;
  }

  log(`  ✅ Found ${matches.length} JSON-LD script(s)`, 'green');

  let allValid = true;

  matches.forEach((match, index) => {
    try {
      const jsonData = JSON.parse(match[1]);
      log(`  📋 Schema ${index + 1}:`, 'blue');

      // Check if it's a graph
      if (jsonData['@graph']) {
        log(`    ✅ Contains @graph with ${jsonData['@graph'].length} items`, 'green');
        jsonData['@graph'].forEach((item, i) => {
          if (item['@type']) {
            log(`      - ${item['@type']}`, 'green');
          }
        });
      } else if (jsonData['@type']) {
        log(`    ✅ Type: ${jsonData['@type']}`, 'green');
      }

      // Validate required fields
      if (!jsonData['@context']) {
        log('    ⚠️  Missing @context', 'yellow');
      }

    } catch (error) {
      log(`  ❌ Invalid JSON in schema ${index + 1}: ${error.message}`, 'red');
      allValid = false;
    }
  });

  return allValid;
}

function validateMetaTags(htmlContent, pageName) {
  const checks = {
    title: /<title>(.*?)<\/title>/.test(htmlContent),
    description: /<meta name="description" content="(.*?)"/.test(htmlContent),
    canonical: /<link rel="canonical" href="(.*?)"/.test(htmlContent),
    ogTitle: /<meta property="og:title" content="(.*?)"/.test(htmlContent),
    ogDescription: /<meta property="og:description" content="(.*?)"/.test(htmlContent),
  };

  log(`\n  🏷️  Meta Tags:`, 'blue');

  Object.entries(checks).forEach(([tag, present]) => {
    if (present) {
      log(`    ✅ ${tag}`, 'green');
    } else {
      log(`    ❌ ${tag} missing`, 'red');
    }
  });

  // Extract and show title
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/);
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length > 60) {
      log(`    ⚠️  Title too long (${title.length} chars, max 60)`, 'yellow');
    }
    log(`    📝 "${title}"`, 'blue');
  }

  return Object.values(checks).every(v => v);
}

function main() {
  log('\n🔍 SEO Validation Starting...\n', 'blue');

  // Check if .next directory exists
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    log('❌ .next directory not found. Run "npm run build" first.', 'red');
    process.exit(1);
  }

  // Pages to check
  const pagesToCheck = [
    { path: '.next/server/app/index.html', name: 'Homepage' },
    { path: '.next/server/app/blog.html', name: 'Blog Listing' },
    { path: '.next/server/app/blog/react-what-why-good-for-business.html', name: 'React Blog Post' },
    { path: '.next/server/app/services/web-development.html', name: 'Web Development Service' },
  ];

  let totalPassed = 0;
  let totalFailed = 0;

  pagesToCheck.forEach(({ path: filePath, name }) => {
    const fullPath = path.join(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
      log(`\n⚠️  ${name}: File not found (${filePath})`, 'yellow');
      totalFailed++;
      return;
    }

    const htmlContent = fs.readFileSync(fullPath, 'utf8');
    const structuredDataValid = validateStructuredData(htmlContent, name);
    const metaTagsValid = validateMetaTags(htmlContent, name);

    if (structuredDataValid && metaTagsValid) {
      log(`\n  ✅ ${name}: PASSED`, 'green');
      totalPassed++;
    } else {
      log(`\n  ❌ ${name}: FAILED`, 'red');
      totalFailed++;
    }
  });

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  log(`\n📊 Summary:`, 'blue');
  log(`  ✅ Passed: ${totalPassed}`, 'green');
  log(`  ❌ Failed: ${totalFailed}`, totalFailed > 0 ? 'red' : 'green');
  log(`\n${'='.repeat(50)}\n`, 'blue');

  if (totalFailed === 0) {
    log('🎉 All SEO checks passed! Ready for deployment.', 'green');
    log('\nNext steps:', 'blue');
    log('1. Test with Google Rich Results: https://search.google.com/test/rich-results', 'blue');
    log('2. Deploy to production', 'blue');
    log('3. Submit sitemap to Google Search Console', 'blue');
    process.exit(0);
  } else {
    log('⚠️  Some checks failed. Review errors above.', 'yellow');
    process.exit(1);
  }
}

main();
