import fs from "fs";
import path from "path";
import {
  compressAllAssets,
  compressAssetsInDirectory,
} from "../lib/compress.js";

export default async function compressAssets(argv) {
  try {
    const rootDir = process.cwd();
    const srcDir = path.join(rootDir, "src");

    const engDir = path.join(srcDir, "ENG");
    const frDir = path.join(srcDir, "FR");

    if (fs.existsSync(engDir)) {
      await compressAllAssets(engDir, path.join(engDir, "compression.log"));
    }

    if (fs.existsSync(frDir)) {
      await compressAllAssets(frDir, path.join(frDir, "compression.log"));
    }

    if (!fs.existsSync(engDir) && !fs.existsSync(frDir)) {
      const assetsDir = path.join(srcDir, "300x250", "assets");
      if (fs.existsSync(assetsDir)) {
        await compressAssetsInDirectory(
          assetsDir,
          path.join(assetsDir, "compression.log")
        );
      } else {
        console.log("No assets to compress.");
      }
    }
  } catch (error) {
    console.error(error);
  }
}
