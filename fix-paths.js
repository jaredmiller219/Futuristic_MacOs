import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fix paths in dist/index.html for Electron
const indexPath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Replace absolute paths with relative paths
  content = content.replace(/href="\/([^"]+)"/g, 'href="./$1"');
  content = content.replace(/src="\/([^"]+)"/g, 'src="./$1"');
  
  // Update title
  content = content.replace(/<title>.*<\/title>/, '<title>Futuristic Mac</title>');
  
  fs.writeFileSync(indexPath, content);
  console.log('✅ Fixed paths in dist/index.html for Electron');
} else {
  console.log('❌ dist/index.html not found');
}
