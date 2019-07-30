const log = console.log;
import {
  nmExists,
  nmInstall,
  nmRemove,
  getNodeModulesPath
} from "../src/index";
import test from "ava";
import path from "path";
import chalk from "chalk";
import { printMirror, printLine } from "tacker";
import { pathsExist } from "paths-exist";
import { init } from "repo-genesis";
import execa from "execa";
import isTravis from "is-travis";

const cwd = process.cwd();
const sandbox = path.join(cwd, "sandbox");
const nmDir = path.join(cwd, "node_modules");

const repository = path.join(sandbox, ".repositories");
const symlink = path.join(sandbox, "npm-starter-sample-module");
test.before(async t => {
  let { config } = require(path.join(cwd, "sandbox", ".repogen.js"));
  //TODO: Make this a function in repo-config
  let symStatus = await pathsExist(symlink);
  let repoStatus = await pathsExist(repository);
  if (isTravis) {
    await execa("rm", ["-Rf", symlink]);
    await execa("rm", ["-Rf", repository]);
  }
  // * Reason for not just wiping out is don't want to have to re-clone constantly during local tests
  if (symStatus === false || repoStatus === false) {
    if (symStatus === true) {
      await execa("rm", ["-Rf", symlink]);
    }
    if (repoStatus === true) {
      await execa("rm", ["-Rf", repository]);
    }
    await init(config);
  }
});
test.serial(
  `${chalk.blue("nmInstall")} :: modules are added successfully`,
  async t => {
    if ((await nmExists(symlink)) === false) {
      try {
        t.true(await nmInstall(symlink));
      } catch (e) {
        t.fail(e);
      }
    } else {
      log(`nmInstall else`);
      t.pass();
    }
  }
);
test.serial(`${chalk.blue("nmRemove")} :: modules are removed`, async t => {
  if ((await nmExists(symlink)) === true) {
    try {
      t.true(await nmRemove(symlink));
    } catch (e) {
      t.fail(e);
    }
  } else {
    log(`nmRemove else`);
    t.pass();
  }
});
test(`${chalk.blue(
  "getNodeModulesPath"
)} :: adds node_modules to directory`, async t => {
  try {
    t.plan(2);
    t.false(cwd.endsWith("node_modules"));
    let nmPath = await getNodeModulesPath(cwd);
    t.true(nmPath.endsWith("node_modules"));
  } catch (e) {
    t.fail(e);
  }
});

test(`${chalk.blue(
  "nmExists"
)} :: returns false if path does not exist`, async t => {
  try {
    let fakePath = "/path/does/not/exist";
    t.false(await nmExists(fakePath));
  } catch (e) {
    t.fail(e);
  }
});

test(`${chalk.blue(
  "nmExists"
)} :: returns null if param undefined`, async t => {
  try {
    t.is(await nmExists(), null);
  } catch (e) {
    t.fail(e);
  }
});
test(`${chalk.blue(
  "nmInstall"
)} :: returns null if param undefined`, async t => {
  try {
    t.is(await nmInstall(), null);
  } catch (e) {
    t.fail(e);
  }
});
test(`${chalk.blue(
  "nmRemove"
)} :: returns null if param undefined`, async t => {
  try {
    t.is(await nmRemove(), null);
  } catch (e) {
    t.fail(e);
  }
});
test(`${chalk.blue(
  "getNodeModulesPath"
)} :: returns null if param undefined`, async t => {
  try {
    t.is(await getNodeModulesPath(), null);
  } catch (e) {
    t.fail(e);
  }
});

test.after.always(async t => {
  try {
    if ((await pathsExist(await getNodeModulesPath(symlink))) === true) {
      t.true(await nmRemove(symlink));
    } else {
      t.pass();
    }
  } catch (e) {
    t.fail(e);
  }
});
