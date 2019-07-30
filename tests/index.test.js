import {
  nmExists,
  nmInstall,
  nmUninstall,
  getNodeModulesPath
} from "../src/index";
import test from "ava";
import path from "path";
import chalk from "chalk";
import { printMirror, printLine } from "tacker";
import { init } from "repo-genesis";

// https://github.com/servexyz/repo-genesis/blob/master/tests/repo.test.js
const rootDir = process.cwd();
const nmDir = path.join(process.cwd(), "node_modules");
const sandboxNmDir = path.join(
  process.cwd(),
  "sandbox",
  "npm-starter-sample-module"
);

// test.skip(`${chalk.blue("nmExists")} :: node_modules ${chalk.underline(
//   "exists"
// )} in this directory`, async t => {
//   try {
//     await nmExists(nmDir);
//     t.pass();
//   } catch (e) {
//     throw new Error(e);
//   }
// });

// test.before(
//   //?  Create a test.before -> confirm node_modules don't exist
//   `${chalk.yellow("nmExists")} :: node_modules are deleted`,
//   async t => {
//     try {
//       let exists = await nmExists(sandboxNmDir);
//       printMirror({ exists }, "magenta", "grey");
//       if (exists === false) {
//         t.pass();
//       } else {
//         nmUninstall(sandboxNmDir);
//         // t.fail();
//       }
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
// );
test.before(
  `${chalk.blue("nmUninstall")} :: confirm node_modules in ${chalk.cyan(
    "npm-starter-sample-module"
  )} are removed`,
  async t => {
    let rgen = {
      symlink: path.join(process.cwd(), "sandbox", "npm-starter-sample-module"),
      repository: path.join(
        process.cwd(),
        "sandbox",
        ".repositories",
        "npm-starter-sample-module"
      )
    };
    try {
      t.true(await nmUninstall(sandboxNmDir));
    } catch (e) {
      throw new Error(e);
    }
  }
);
test(`${chalk.blue(
  "getNodeModulesPath"
)} :: adds node_modules to directory`, async t => {
  printMirror({ rootDir }, "green", "grey");
  try {
    t.plan(2);
    t.false(rootDir.endsWith("node_modules"));
    let nmPath = await getNodeModulesPath(rootDir);
    printMirror({ nmPath }, "magenta", "grey");
    t.true(nmPath.endsWith("node_modules"));
  } catch (e) {
    t.fail(e);
  }
});

test(`${chalk.blue(
  "getNodeModulesPath"
)} :: successfully returns false if path does not exist`, async t => {
  printMirror({ rootDir }, "green", "grey");
  try {
    let fakePath = "/path/does/not/exist";
    let nmPath = await getNodeModulesPath(fakePath);
    t.false(nmPath);
  } catch (e) {
    t.fail(e);
  }
});

// test.serial.before(`${chalk.blue("nmInstall")}`, async t => {
//   try {
//     await nmInstall(sandboxNmDir);
//     t.pass();
//   } catch (e) {
//     throw new Error(e);
//   }
// });
//TODO: Create a test.serial.before -> install node_modules
//TODO: Create a test.serial.before -> confirm node_modules exist
//TODO: Create a test.after -> remove node_modules

//TODO: Change test to test.after.always
// test(`${chalk.red(
//   "nmUninstall"
// )} :: remove node_modules directory`, async t => {
//   printMirror({ sandboxNmDir }, "blue", "grey");
//   let uninstalled = await nmUninstall(sandboxNmDir).catch(e => {
//     throw new Error(e);
//   });
//   t.true(uninstalled);
// });
// test.skip(`${chalk.blue("nmInstall")} :: node_modules ${chalk.underline(
//   "does not exist"
// )} in ${chalk.cyan(
//   "npm-starter-sample-module"
// )} and are subsequently installed`, async t => {
//   printMirror({ sandboxNmDir }, "green", "grey");
//   t.plan(3);
//   let x = await nmExists(sandboxNmDir);
//   t.false(x);
//   printMirror({ x }, "magenta", "grey");
//   await nmInstall(sandboxNmDir);
//   let y = await nmExists(sandboxNmDir);
//   printMirror({ y }, "magenta", "grey");
//   t.true(y);
// });

// test.skip(`${chalk.blue(
//   "nmExists"
// )} :: node_modules directory is ${chalk.underline(
//   "appended"
// )} to path when not provided`, t => {
//   t.pass();
// });
// test.skip(`${chalk.blue(
//   "nmInstall"
// )} :: node_modules directory is ${chalk.underline(
//   "removed"
// )} from path when not provided`, t => {
//   t.pass();
// });
