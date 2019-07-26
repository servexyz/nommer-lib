import { nmExists, nmInstall } from "../src/index";
import test from "ava";
import path from "path";
import chalk from "chalk";
import { printMirror, printLine } from "tacker";
test(`${chalk.blue("nmExists")} :: node_modules ${chalk.underline(
  "exists"
)} in this directory`, async t => {
  let nmDir = path.join(process.cwd(), "node_modules");
  try {
    await nmExists(nmDir);
    t.pass();
  } catch (e) {
    throw new Error(e);
  }
});

//TODO: Create a test.before ->  removes node_modules from sandbox repo
//TODO: Create a test.serial.before -> confirms node_modules directory is not there
//TODO: Create a test.serial.before -> install node_modules
//TODO: Create a test.serial.before -> confirm node_modules exist
test(`${chalk.blue("nmInstall")} :: node_modules ${chalk.underline(
  "does not exist"
)} in ${chalk.cyan(
  "npm-starter-sample-module"
)} and are subsequently installed`, async t => {
  let sandboxNmDir = path.join(
    process.cwd(),
    "sandbox",
    "npm-starter-sample-module"
  );
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
