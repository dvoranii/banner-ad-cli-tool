import fs from "fs";
import path from "path";

import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminSvgo from "imagemin-svgo";
import imageminGifsicle from "imagemin-gifsicle";

export async function compressAssetsInDirectory(assetsDir, logFilePath) {
  const files = fs.readdirSync(assetsDir);
  const imageFiles = files.filter((file) =>
    /\.(jpe?g|png|svg|gif)$/i.test(file)
  );

  if (imageFiles.length === 0) {
    console.log(`No assets to compress in ${assetsDir}`);
    return;
  }

  if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "");
  }

  const logFileContent = fs.readFileSync(logFilePath, "utf8");
  const logEntries = logFileContent.split("\n").filter((entry) => entry !== "");

  const processedFiles = [];

  for (const entry of logEntries) {
    const [fileName, dateString, originalSizeString, newSizeString] =
      entry.split(" - ");
    const originalSize = parseInt(originalSizeString.split(":")[1]);
    const newSize = parseInt(newSizeString.split(":")[1]);
    processedFiles.push({ fileName, originalSize, newSize });
  }

  for (const file of imageFiles) {
    const filePath = path.join(assetsDir, file);
    const originalSize = fs.statSync(filePath).size;

    const lastProcessedEntry = processedFiles.find(
      (entry) => entry.fileName === file
    );

    if (lastProcessedEntry) {
      console.log(`Skipped already compressed ${file} in ${assetsDir}`);
      continue;
    }

    const compressedBuffer = await imagemin.buffer(fs.readFileSync(filePath), {
      plugins: [
        imageminMozjpeg(),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminSvgo(),
        imageminGifsicle(),
      ],
    });

    // might remove log file entirely
    const compressedSize = compressedBuffer.byteLength;

    // console.log(`Original size of ${file}: ${originalSize}`);
    // console.log(`Compressed size of ${file}: ${compressedSize}`);

    if (compressedSize < originalSize) {
      fs.writeFileSync(filePath, compressedBuffer);
      console.log(`Compressed ${file} in ${assetsDir}`);

      const now = new Date().toISOString();
      const logEntry = `${file} - date:${now} - originalSize:${originalSize}kb - newSize:${compressedSize}kb\n`;
      console.log(logEntry);
      fs.appendFileSync(logFilePath, logEntry);
    }
  }
}

export async function compressAllAssets(baseDir, logFilePath) {
  const dirs = fs
    .readdirSync(baseDir)
    .filter((dir) => fs.statSync(path.join(baseDir, dir)).isDirectory());

  for (const dirName of dirs) {
    const dirPath = path.join(baseDir, dirName);
    const assetsDir = path.join(dirPath, "assets");
    if (fs.existsSync(assetsDir)) {
      await compressAssetsInDirectory(assetsDir, logFilePath);
    }
  }
}
