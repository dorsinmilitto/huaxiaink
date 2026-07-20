/**
 * Postinstall script: Patch gray-matter to strip AIGC watermark blocks at parse time.
 *
 * The local AIGC watermark hook injects AIGC blocks into .md files on every
 * write. These blocks cause YAML parse failures in gray-matter because they
 * form a separate frontmatter block at the start of the file.
 *
 * This script patches node_modules/gray-matter/index.js to strip AIGC blocks
 * before parsing, so the build works regardless of whether .md files have AIGC.
 *
 * This is automatically run after `npm install` via the "postinstall" script
 * in package.json, ensuring it works on both local and Cloudflare builds.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRAY_MATTER_PATH = path.join(__dirname, '..', 'node_modules', 'gray-matter', 'index.js');

const PATCH_MARKER = '// Strip AIGC watermark blocks (injected by system hook)';

const PATCH_CODE = `  // Strip AIGC watermark blocks (injected by system hook)
  if (typeof input === 'string') {
    // Remove ALL AIGC blocks WITHOUT consuming the closing --- delimiter
    // Pattern 1: standalone AIGC block with its own --- delimiters at start of file
    input = input.replace(/^[\\s\\r\\n]*---\\s*\\r?\\nAIGC:\\s*\\r?\\n(?:\\s+[^\\n]*\\r?\\n)*---[\\s\\r\\n]*/, '');
    
    // Pattern 2: AIGC block inside frontmatter (between affiliate data and closing ---)
    // Key fix: remove only the AIGC key-value lines, NOT the closing ---
    input = input.replace(/\\r?\\nAIGC:\\s*\\r?\\n(?:\\s+[^\\n]*\\r?\\n)*/g, '\\n');
    
    // Pattern 3: any remaining standalone ---\\nAIGC...\\n--- blocks
    input = input.replace(/---\\s*\\r?\\nAIGC:\\s*\\r?\\n(?:\\s+[^\\n]*\\r?\\n)*---/g, '');
    
    // Clean up leading whitespace so frontmatter starts with ---
    input = input.replace(/^[\\s\\r\\n]+/, '');
  }

`;

function patchGrayMatter() {
  if (!fs.existsSync(GRAY_MATTER_PATH)) {
    console.log('gray-matter not found, skipping patch (may not be installed yet)');
    return;
  }

  const content = fs.readFileSync(GRAY_MATTER_PATH, 'utf-8');

  // Check if already patched
  if (content.includes(PATCH_MARKER)) {
    console.log('gray-matter already patched with AIGC stripping, skipping.');
    return;
  }

  // Find insertion point: before "let file = toFile(input);"
  const insertionPoint = '  let file = toFile(input);';
  const index = content.indexOf(insertionPoint);

  if (index === -1) {
    console.error('ERROR: Could not find insertion point in gray-matter/index.js');
    console.error('The file may have a different version. Manual patching required.');
    process.exit(1);
  }

  // Insert the patch code before the insertion point
  const patchedContent = content.slice(0, index) + PATCH_CODE + content.slice(index);

  fs.writeFileSync(GRAY_MATTER_PATH, patchedContent, 'utf-8');
  console.log('gray-matter patched with AIGC block stripping.');
  console.log('  Patched at: ' + GRAY_MATTER_PATH);
}

try {
  patchGrayMatter();
} catch (err) {
  console.error('Failed to patch gray-matter:', err.message);
  // Don't fail the install if patching fails - the build might still work
  // if no AIGC blocks are present
  process.exit(0);
}
