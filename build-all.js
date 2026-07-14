import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Helper to recursively copy directories
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  console.log("=== Build Step 1: Building Task 2 (Customer Consolidator) ===");
  execSync("npx vite build", { stdio: 'inherit' });

  console.log("\n=== Build Step 2: Building Task 3 (Sales Spreadsheet Dashboard) ===");
  execSync("npx vite build", { cwd: path.resolve('sales-dashboard'), stdio: 'inherit' });

  console.log("\n=== Build Step 3: Merging builds (copying sales-dashboard/dist to dist/sales-dashboard) ===");
  const srcDist = path.resolve('sales-dashboard/dist');
  const destDist = path.resolve('dist/sales-dashboard');
  
  if (fs.existsSync(destDist)) {
    fs.rmSync(destDist, { recursive: true, force: true });
  }
  
  copyDirSync(srcDist, destDist);
  console.log("\nAll builds merged successfully and ready for deployment!");
} catch (error) {
  console.error("Compilation pipeline failed:", error);
  process.exit(1);
}
