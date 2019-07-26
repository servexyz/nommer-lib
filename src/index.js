import { pathsExist } from "paths-exist";
import execa from "execa";

export async function nmExists(mPath) {
  //TODO: Add logic to append node_modules directory if root directory provided
  try {
    let pex = await pathsExist(mPath);
    printMirror({ pex }, "cyan", "grey");
    return true;
  } catch (e) {
    return false;
  }
}
export async function getNodeModulesPath(szPath) {
  if (szPath.endsWith("node_modules")) {
    return szPath;
  } else {
    let nmPath = path.join(szPath, "node_modules");
    try {
      let bNM = await nmExists(szPath);
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
  try {
    await execa("rm", ["-Rf", szPath], { cwd: szPath });
  } catch (e) {
    throw new Error(e);
  }
}
//TODO: Create a remove node_modules directory fn
//TODO: Create a run npm script (eg. for "build")
