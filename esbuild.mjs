import esbuild from 'esbuild';
import {existsSync, mkdirSync} from 'fs';
import {join} from 'path';

const dist = join(process.cwd(), 'dist');

if (!existsSync(dist)) {
  mkdirSync(dist);
}

// Background worker

esbuild
  .build({
    entryPoints: ['src/plugin/background.ts'],
    bundle: true,
    platform: 'node',
    target: ['node10.4'],
    outfile: 'dist/background.js'
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ['src/plugin/worker.ts'],
    bundle: true,
    minify: true,
    target: ['es2019'],
    outfile: 'dist/worker.js',
    loader: {
      '.svg': 'text'
    }
  })
  .catch(() => process.exit(1));

// Options UI
