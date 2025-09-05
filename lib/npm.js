import fs from "fs";
import path from "path";
import { exec } from "child_process";

export async function createPackageJson(projectPath) {
  const pkgJson = {
    name: path.basename(projectPath),
    version: "1.0.0",
    description: "",
    private: true,
    scripts: {
      build: "banner-ad compressAssets && banner-ad zipAll",
      zipAll: "banner-ad zipAll",
      compressAssets: "banner-ad compressAssets",
    },
  };

  const data = JSON.stringify(pkgJson, null, 2);
  fs.writeFileSync(path.join(projectPath, "package.json"), data);

  // Install dependencies after creating package.json
  return installDependencies(projectPath);
}

export function installDependencies(projectPath) {
  return new Promise((resolve, reject) => {
    console.log("Installing dependencies...");

    exec("npm install", { cwd: projectPath }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      const output = stdout
        .split(/\n/g)
        .filter((text) => {
          return text.startsWith("added");
        })
        .join("");
      console.log(output);
      resolve(stdout);
    });
  });
}
