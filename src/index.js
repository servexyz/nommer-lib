import { pathsExist } from "paths-exist";
import execa from "execa";

export async function nmExists(mPath) {
  //TODO: Add logic to append node_modules directory if root directory provided
  try {
    await pathsExist(mPath);
  } catch (e) {
    throw new Error(e);
  }
}
export async function nmInstall(bFlag) {
  if (bFlag === true) {
    try {
      await execa("npm", ["install"]);
    } catch (e) {
      throw new Error(e);
    }
  }
}
