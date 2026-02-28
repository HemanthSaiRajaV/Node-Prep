import { readdirSync, statSync } from 'fs';
import { join, extname, resolve } from 'path';
import { execSync } from 'child_process';

// Recursively traverse a directory and execute every .js file found
function runDir(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      // skip node_modules and other hidden directories
      if (entry === 'node_modules' || entry.startsWith('.')) continue;
      runDir(fullPath);
    } else if (stats.isFile() && extname(fullPath) === '.js') {
      // avoid executing this runner script again (compare resolved paths)
      const thisScript = process.argv[1] ? resolve(process.argv[1]) : null;
      if (thisScript && resolve(fullPath) === thisScript) continue;

      console.log(`\n=== running ${fullPath} ===`);
      try {
        execSync(`node "${fullPath}"`, { stdio: 'inherit' });
      } catch (err) {
        console.error(`failed to execute ${fullPath}:`, err.message);
      }
    }
  }
}

runDir(process.cwd());
