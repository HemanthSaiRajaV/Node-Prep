import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { exec } from 'child_process';

const NOTES_DIR = path.resolve('./notes');

async function runFile(filePath) {
  console.log(`\n-- running ${filePath}`);

  try {
    // dynamic import requires a file:// URL
    await import(pathToFileURL(filePath).href);
  } catch (err) {
    console.warn(`import failed for ${filePath}: ${err.message}`);
    await new Promise((resolve) => {
      exec(`node "${filePath}"`, (error, stdout, stderr) => {
        if (stdout) process.stdout.write(stdout);
        if (stderr) process.stderr.write(stderr);
        if (error) console.error(`child process error:`, error);
        resolve();
      });
    });
  }
}

/**
 * Recursively traverse a directory and run every .js file found.
 */
async function traverse(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await traverse(full);
    } else if (entry.isFile() && full.endsWith('.js')) {
      await runFile(full);
    }
  }
}

// kick things off
traverse(NOTES_DIR).catch((err) => {
  console.error('error traversing notes directory', err);
});
