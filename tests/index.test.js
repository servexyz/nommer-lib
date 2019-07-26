import { nmExists, nmInstall } from "../src/index";
import test from "ava";
import path from "path";
import chalk from "chalk";
import { printMirror, printLine } from "tacker";

let nmDir = path.join(process.cwd(), "node_modules");
let sandboxNmDir = path.join(
  process.cwd(),
  "sandbox",
  "npm-starter-sample-module"
);
test(`${chalk.blue("nmExists")} :: node_modules ${chalk.underline(
  "exists"
)} in this directory`, async t => {
  try {
    await nmExists(nmDir);
    t.pass();
  } catch (e) {
    throw new Error(e);
  }
});

test.before(
  `${chalk.yellow("nmExists")} :: node_modules are deleted`,
  async t => {
    try {
      let exists = await nmExists(sandboxNmDir);
      printMirror({ exists }, "magenta", "grey");
      if (exists === false) {
        t.pass();
      } else {
        t.fail();
      }
    } catch (e) {
      throw new Error(e);
    }
  }
);
//TODO: Create a test.before ->  confirm node_modules don't exist
//TODO: Create a test.serial.before -> confirms node_modules directory is not there
//TODO: Create a test.serial.before -> install node_modules
//TODO: Create a test.serial.before -> confirm node_modules exist
//TODO: Create a test.after -> remove node_modules

test.skip(`${chalk.blue("nmInstall")} :: node_modules ${chalk.underline(
  "does not exist"
)} in ${chalk.cyan(
  "npm-starter-sample-module"
)} and are subsequently installed`, async t => {
  printMirror({ sandboxNmDir }, "green", "grey");
  t.plan(3);
  let x = await nmExists(sandboxNmDir);
  t.false(x);
  printMirror({ x }, "magenta", "grey");
  await nmInstall(sandboxNmDir);
  let y = await nmExists(sandboxNmDir);
  printMirror({ y }, "magenta", "grey");
  t.true(y);
});

test(`${chalk.blue("nmExists")} :: node_modules directory is ${chalk.underline(
  "appended"
)} to path when not provided`, t => {
  t.pass();
});
test(`${chalk.blue("nmInstall")} :: node_modules directory is ${chalk.underline(
  "removed"
)} from path when not provided`, t => {
  t.pass();
});
