const log = console.log;
import { pathsExist } from "paths-exist";
import { printMirror } from "tacker";
import execa from "execa";
import path from "path";

export async function nmExists(mPath) {
  //TODO: Add logic to append node_modules directory if root directory provided
  try {
    return await pathsExist(mPath);
  } catch (e) {
    throw new Error(e);
  }
}
export async function getNodeModulesPath(szPath) {
  // printMirror({ szPath }, "cyan", "grey");
  if (szPath.endsWith("node_modules")) {
    return szPath;
  } else {
    let nmPath = path.join(szPath, "node_modules");
    // printMirror({ nmPath }, "cyan", "grey");
    try {
      let bNM = await nmExists(szPath);
      // printMirror({ bNM }, "cyan", "grey");
      return bNM === true ? nmPath : false;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export async function nmInstall(szPath) {
  if (typeof szPath === "undefined") return null;
  try {
    await execa("npm", ["install"], { cwd: szPath });
    return true;
  } catch (e) {
    return false;
  }
}
//TODO: Rename nmUninstall to nmRemove
export async function nmUninstall(szPath) {
  //? Probably not good idea to actually export this...
  //? Difficult to protect users from accidentally deleting their own shit.
  //? Added getNodeModulesPath() as prelim user protection, but still probably not enough
  //TODO: Add a check that prevents it from running if szPath is === process.cwd()
  // printMirror({ szPath }, "yellow", "grey");
  let nmPath = await getNodeModulesPath(szPath);
  // printMirror({ nmPath }, "yellow", "grey");
  if (nmPath !== false) {
    // printMirror({ nmPath }, "yellow", "grey");
    log(`getNodeModulesPath - nmPath is false`);
    try {
      if (nmPath !== process.cwd()) {
        await execa("rm", ["-Rf", nmPath], { cwd: nmPath });
        return true;
      } else {
        console.warn(
          "To prevent accidents, nmUninstall will not remove the provided path if it matches your current working directory"
        );
        return null;
      }
    } catch (e) {
      throw new Error(e);
    }
  } else {
    log("getNodeModulesPath else");
    return false;
  }
}
//TODO: Create a remove node_modules directory fn
//TODO: Create a run npm script (eg. for "build")
