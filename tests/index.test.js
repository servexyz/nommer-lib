import { nmExists, nmInstall } from "../src/index";
import test from "ava";
import path from "path";

let nmDir = path.join(process.cwd(), "node_modules");
test("nmExists :: node_modules in this directory exists", async t => {
  try {
    await nmExists(nmDir);
    t.pass();
  } catch (e) {
    throw new Error(e);
  }
});
