const log = console.log;
import { pathsExist } from "paths-exist";
import { printMirror } from "tacker";
import execa from "execa";
import path from "path";

//TODO: Consider creating a run npm script (eg. for "build"); useful for Protato
//TODO: Consider renaming all "nm" to "nmr"

export async function nmExists(mPath) {
  if (typeof mPath === "undefined") return null;
  //TODO: Add logic to append node_modules directory if root directory provided
  try {
    return await pathsExist(getNodeModulesPath(mPath));
  } catch (e) {
    throw new Error(e);
  }
}
//TODO: Make this a dumb function (without pathExists check)
export function getNodeModulesPath(szPath) {
  if (typeof szPath === "undefined") return null;
  if (szPath.endsWith("node_modules")) {
    return szPath;
  } else {
    return path.join(szPath, "node_modules");
  }
}
//TODO: Figure out why this works locally but fails on test
export async function nmInstall(szPath) {
  if (typeof szPath === "undefined") return null;
  try {
    await execa("npm", ["install"], { cwd: szPath });
    return true;
  } catch (e) {
    return false;
  }
}
export async function nmRemove(szPath) {
  if (typeof szPath === "undefined") return null;
  if (await nmExists(szPath)) {
    try {
      let nmPath = getNodeModulesPath(szPath);
      if (szPath !== process.cwd()) {
        await execa("rm", ["-Rf", nmPath], { cwd: nmPath });
        return true;
      } else {
        console.warn(
          "To prevent accidents, nmRemove will not remove the provided path if it matches your current working directory"
        );
        return false;
      }
    } catch (e) {
      throw new Error(e);
    }
  } else {
    return false;
  }
}
