/**
 * Prebuild script: Strip AIGC watermark frontmatter blocks from all .md files
 * in src/content before Astro build.
 *
 * AIGC blocks appear at the start of files as:
 * ---
 * AIGC:
 *   ContentProducer: '...'
 *   ...
 * ---
 * (empty line)
 * (then real frontmatter starts with ---)
 *
 * This script removes the AIGC block so the file starts with real frontmatter.
 * This is needed because the local AIGC watermark hook injects these blocks
 * into .md files, and Cloudflare's build environment (fresh npm install)
 * doesn't have the gray-matter patch to handle them.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');

function stripAigcBlocks(dir) {
  let cleaned = 0;
  let skipped = 0;

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');

        // Check if file starts with AIGC block
        if (!content.startsWith('---\nAIGC:')) {
          skipped++;
          continue;
        }

        // Find the end of the AIGC block (second ---)
        // The AIGC block is: ---\nAIGC:\n...\n---\n
        const firstDashesEnd = content.indexOf('\n', 0); // end of first ---
        const closingDashes = content.indexOf('\n---', firstDashesEnd + 1);

        if (closingDashes === -1) {
          console.warn(`  WARNING: Could not find AIGC block end in ${entry.name}`);
          skipped++;
          continue;
        }

        // Find the end of the closing --- line
        let afterAigc = closingDashes + 4; // skip \n---

        // Skip any trailing newlines/empty lines after AIGC block
        while (afterAigc < content.length && (content[afterAigc] === '\n' || content[afterAigc] === '\r')) {
          afterAigc++;
        }

        // The rest should start with ---
        const cleanedContent = content.substring(afterAigc);

        if (!cleanedContent.startsWith('---')) {
          console.warn(`  WARNING: Cleaned content doesn't start with --- in ${entry.name}`);
          skipped++;
          continue;
        }

        fs.writeFileSync(fullPath, cleanedContent, 'utf-8');
        cleaned++;
        console.log(`  Cleaned: ${entry.name} (${content.length}B -> ${cleanedContent.length}B)`);
      }
    }
  }

  walk(dir);
  console.log(`\nAIGC stripping complete: ${cleaned} cleaned, ${skipped} skipped`);
  return { cleaned, skipped };
}

console.log('Stripping AIGC blocks from src/content/*.md...');
const result = stripAigcBlocks(CONTENT_DIR);

// Verify
if (result.cleaned > 0) {
  console.log('\nVerification: checking for remaining AIGC markers...');
  let remaining = 0;
  function verify(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        verify(fullPath);
      } else if (entry.name.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.startsWith('---\nAIGC:') || content.substring(0, 500).includes('ContentProducer')) {
          remaining++;
          console.error(`  STILL HAS AIGC: ${entry.name}`);
        }
      }
    }
  }
  verify(CONTENT_DIR);
  if (remaining === 0) {
    console.log('All clear - no AIGC markers remaining!');
  } else {
    console.error(`ERROR: ${remaining} files still have AIGC markers!`);
    process.exit(1);
  }
}
