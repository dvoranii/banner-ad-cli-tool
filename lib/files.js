import fs from "fs";
import path from "path";

export async function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

export async function createDirectoryWithFile(
  directoryPath,
  fileName,
  fileContent
) {
  createDirectory(directoryPath);
  fs.writeFileSync(path.join(directoryPath, fileName), fileContent);
}

export async function createDirectoryWithAssets(directoryPath) {
  createDirectory(directoryPath);
  const assetsPath = path.join(directoryPath, "assets");
  createDirectory(assetsPath);
}

export async function getDirectoriesWithIndexHtml(baseDir) {
  return fs
    .readdirSync(baseDir)
    .filter(
      (dir) =>
        fs.statSync(path.join(baseDir, dir)).isDirectory() &&
        fs.existsSync(path.join(baseDir, dir, "index.html"))
    )
    .map((dir) => ({ path: path.join(baseDir, dir), name: dir }));
}
