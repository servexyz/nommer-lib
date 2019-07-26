import { pathsExist } from "paths-exist";
import { printMirror } from "tacker";
import path from "path";
import execa from "execa";

export async function nmExists(mPath) {
  //TODO: Add logic to append node_modules directory if root directory provided
  try {
    let pex = await pathsExist(mPath);
    printMirror({ pex }, "cyan", "grey");
    return true;
  } catch (e) {
    printMirror({ e }, "magenta", "grey");
    return false;
  }
}
export async function getNodeModulesPath(szPath) {
  printMirror({ szPath }, "cyan", "grey");
  if (szPath.endsWith("node_modules")) {
    return szPath;
  } else {
    let nmPath = path.join(szPath, "node_modules");
    printMirror({ nmPath }, "cyan", "grey");
    try {
      let bNM = await nmExists(szPath);
      // ? bNM is false
      printMirror({ bNM }, "cyan", "grey");
      return bNM === true ? nmPath : false;
    } catch (e) {
      throw new Error(e);
    }
  }
}
export async function nmInstall(szPath) {
  try {
    await execa("npm", ["install"], { cwd: szPath });
  } catch (e) {
    throw new Error(e);
  }
}
export async function nmUninstall(szPath) {
  //? Probably not good idea to actually export this...
  //? Difficult to protect users from accidentally deleting their own shit.
  //? Added getNodeModulesPath() as prelim user protection, but still probably not enough
  //TODO: Add a check that prevents it from running if szPath is === process.cwd()
  // printMirror({ szPath }, "yellow", "grey");
  let nmPath = await getNodeModulesPath(szPath);
  // printMirror({ nmPath }, "yellow", "grey");
  if (nmPath !== false) {
    printMirror({ nmPath }, "yellow", "grey");
    try {
      if (nmPath !== process.cwd()) {
        await execa("rm", ["-Rf", szPath], { cwd: nmPath });
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
    return false;
  }
}
//TODO: Create a remove node_modules directory fn
//TODO: Create a run npm script (eg. for "build")
