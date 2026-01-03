import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const srcDir = path.join(rootDir, 'dist/_worker.js/_astro');
const destDir = path.join(rootDir, 'dist/_astro');

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.css'));
  
  // destDirが存在しない場合は作成
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  files.forEach(f => {
    const srcFile = path.join(srcDir, f);
    const destFile = path.join(destDir, f);
    
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, destFile);
      console.log(`✅ Copied ${f} to dist/_astro/`);
    }
  });
  
  console.log(`✨ Copied ${files.length} CSS file(s)`);
} else {
  console.log('⚠️  Source directory not found:', srcDir);
}
