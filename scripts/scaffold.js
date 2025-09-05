import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { boilerplateHTML } from "../template/template.js";
import {
  createDirectory,
  createDirectoryWithAssets,
  createDirectoryWithFile,
} from "../lib/files.js";
import { createPackageJson, installDependencies } from "../lib/npm.js";
import { initRepo, initialCommit } from "../lib/git.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function scaffoldProject(argv) {
  const projectName = argv["project-name"];
  const projectPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(projectPath)) {
    console.error(`Error: Project folder "${projectName}" already exists.`);
    process.exit(1);
  }

  console.log(`\nScaffolding new project ${projectName}...`);
  const BI_LING = "biLing";

  createDirectory(projectPath);

  const tempPath = path.join(projectPath, "temp");
  createDirectory(tempPath);

  const srcPath = path.join(projectPath, "src");
  createDirectory(srcPath);

  const distPath = path.join(projectPath, "dist");
  createDirectory(distPath);

  const installingPackages = createPackageJson(projectPath);

  const templateGitignorePath = path.join(
    __dirname,
    "../template",
    ".gitignore"
  );
  const projectGitignorePath = path.join(projectPath, ".gitignore");
  fs.copyFileSync(templateGitignorePath, projectGitignorePath);

  const templateHintRcPath = path.join(__dirname, "../template", ".hintrc");
  const projectHintRcPath = path.join(projectPath, ".hintrc");
  fs.copyFileSync(templateHintRcPath, projectHintRcPath);

  const initilizingRepo = initRepo(projectPath);

  const defaultDimensions = "300x250";

  if (argv.biLing === BI_LING) {
    const engDimensionsPath = path.join(srcPath, "ENG", `${defaultDimensions}`);
    createDirectoryWithFile(engDimensionsPath, "index.html", boilerplateHTML());
    createDirectoryWithAssets(engDimensionsPath);

    const frDimensionsPath = path.join(srcPath, "FR", `${defaultDimensions}`);
    createDirectoryWithFile(frDimensionsPath, "index.html", boilerplateHTML());
    createDirectoryWithAssets(frDimensionsPath);
  } else {
    const dimensionsPath = path.join(srcPath, `${defaultDimensions}`);
    createDirectoryWithFile(dimensionsPath, "index.html", boilerplateHTML());
    createDirectoryWithAssets(dimensionsPath);
  }

  await Promise.all([initilizingRepo, installingPackages]).then(() =>
    initialCommit(projectPath)
  );

  console.log(`Scaffolded ${projectName} in ${projectPath}`);
}
