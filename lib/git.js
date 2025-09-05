import { exec } from "child_process";

export function initRepo(projectPath) {
  return new Promise((resolve, reject) => {
    exec("git init", { cwd: projectPath }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

export function initialCommit(projectPath) {
  return new Promise((resolve, reject) => {
    exec("git add .", { cwd: projectPath }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }

      exec(
        'git commit -m "scaffolded project"',
        { cwd: projectPath },
        (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }

          console.log(stdout);
          resolve(stdout);
        }
      );
    });
  });
}
