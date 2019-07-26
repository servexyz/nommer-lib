import { pathsExist } from "paths-exist";
import execa from "execa";

export async function nmExists(mPath) {
  //TODO: Add logic to append node_modules directory if root directory provided
  try {
    await pathsExist(mPath);
    return true;
  } catch (e) {
    // throw new Error(e);
    return false;
  }
}
export async function nmInstall(szPath) {
  try {
    // await execa("cd", [szPath, "&&", "npm", "install"]);
    await execa("npm", ["install"], { cwd: szPath });
  } catch (e) {
    throw new Error(e);
  }
}

//TODO: Create a remove node_modules directory fn
//TODO: Create a run npm script (eg. for "build")
