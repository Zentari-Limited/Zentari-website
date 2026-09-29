import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(projectRoot, 'dist');

rmSync(outputDirectory, { recursive: true, force: true });
mkdirSync(outputDirectory, { recursive: true });

for (const file of ['index.html', 'styles.css', 'script.js']) {
  cpSync(join(projectRoot, file), join(outputDirectory, file));
}

cpSync(join(projectRoot, 'assets'), join(outputDirectory, 'assets'), {
  recursive: true,
});

console.log(`Built static website into ${outputDirectory}`);
