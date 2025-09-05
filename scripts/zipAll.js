import fs from "fs";
import path from "path";
import archiver from "archiver";

import { getDirectoriesWithIndexHtml } from "../lib/files.js";

export default async function zipAll(argv) {
  try {
    const rootDir = process.cwd();
    const finalFilesDir = path.join(rootDir, "dist");
    let existingFileNames = [];

    if (fs.existsSync(finalFilesDir)) {
      const existingFiles = fs.readdirSync(finalFilesDir);
      existingFileNames = existingFiles.map((file) => file.slice(0, -4));
    } else {
      fs.mkdirSync(finalFilesDir);
    }

    const srcDir = path.join(rootDir, "src");
    const engDir = path.join(srcDir, "ENG");
    const frDir = path.join(srcDir, "FR");

    const dirs = [
      ...(fs.existsSync(engDir)
        ? await getDirectoriesWithIndexHtml(engDir)
        : []),
      ...(fs.existsSync(frDir) ? await getDirectoriesWithIndexHtml(frDir) : []),
      ...(await getDirectoriesWithIndexHtml(srcDir)),
    ];

    const dirsToZip = dirs.filter(
      ({ name }) => !existingFileNames.includes(name)
    );
    dirsToZip.forEach(({ path: dirPath, name: dirName }) => {
      const output = fs.createWriteStream(
        path.join(finalFilesDir, `${dirName}.zip`)
      );

      const archive = archiver("zip", { zlib: { level: 9 } });
      archive.pipe(output);
      archive.directory(dirPath, dirName);
      archive.finalize();

      output.on("close", () => {
        console.log(`Created ${path.join(finalFilesDir, `${dirName}.zip`)}`);
        if (
          dirsToZip.every(({ name }) =>
            fs.existsSync(path.join(finalFilesDir, `${name}.zip`))
          )
        ) {
          console.log("All files zipped successfully!");
          process.exit();
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}
