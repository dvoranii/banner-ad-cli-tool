#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import scaffoldProject from "./scripts/scaffold.js";
import zipAll from "./scripts/zipAll.js";
import compressAssets from "./scripts/compressAssets.js";

yargs(hideBin(process.argv))
  .command({
    command: "scaffold <project-name> [biLing]",
    describe: "Scaffold a new project",
    builder: (yargs) =>
      yargs.positional("project-name", {
        describe: "Name of the project",
        type: "string",
      }),
    handler: scaffoldProject,
  })
  .command({
    command: "zipAll",
    describe: "Zip all ad projects and move them to dist directory",
    handler: zipAll,
  })
  .command({
    command: "compressAssets",
    describe: "Compress all image assets in the project",
    handler: compressAssets,
  })
  .command({
    command: "$0",
    handler: () => {
      console.log(
        'You must provide a command such as "scaffold", "zipAll", or "compressAssets".'
      );
    },
  })
  .help().argv;
