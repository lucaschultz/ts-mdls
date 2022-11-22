import { exec as cExec } from "child_process";
import { promisify } from "util";
import {
  MetadataAttributeKeyArray,
  MetadataAttributeParsers,
  MetadataAttributes,
  MetadataObjectFromArray,
} from "./types";
import { metadatAttributeParsers } from "./utilities/metadataAttributeParsers";

const exec = promisify(cExec);

/**
 * Get the metadata attributes for the specified file/folder
 * 
 * @param path Path of the file/folder to get the metadata attributes for
 * @returns A promise for an object containing metadata attributes
 * 
 * @example
 * (async () => {
 *   try {
 *     const data = await mdls("./src/index.ts");
 *     console.log(data);
 *   } catch (error) {
 *     console.log(error);
 *   }
 * })();
 */
async function mdls(path: string): Promise<MetadataAttributes>;

/**
 * Get the metadata attributes for the specified file/folder
 * 
 * @param path Path of the file/folder to get the metadata attributes for
 * @param attributeKeys Get only the metadata attribute values of the provided keys
 * @returns A promise for an object containing the selected metadata attributes
 * 
 * @example
 * (async () => {
 *   try {
 *     const data = await mdls("./src/index.ts", [
 *       "kMDItemUserTags",
 *       "kMDItemFSCreationDate",
 *     ]);
 *     console.log(data);
 *   } catch (error) {
 *     console.log(error);
 *   }
 * })();
 */
async function mdls<T extends MetadataAttributeKeyArray>(
  path: string,
  attributeKeys: T
): Promise<MetadataObjectFromArray<T>>;

async function mdls(path: string, attributeKeys?: MetadataAttributeKeyArray) {
  if (process.platform !== "darwin")
    throw new Error(process.platform + " is not supported.");

  const names = attributeKeys?.map((a) => `-name ${a}`).join(" ");

  const { stdout } = await exec(`/usr/bin/mdls ${names ?? ""} '${path}'`);

  const rawAttributes = stdout
    .split(/\s+(?=kMD)/)
    .map((a) => a.split("=").map((i) => i.trim()));

  const result: MetadataAttributes = {};
  for (const rawAttribute of rawAttributes) {
    const key = rawAttribute[0] as keyof MetadataAttributeParsers;
    const value = rawAttribute[1];
    const parser = metadatAttributeParsers[key] as
      | MetadataAttributeParsers[typeof key]
      | undefined;
    if (parser === undefined) {
      continue;
    } else {
      result[key] = parser(value) as any;
    }
  }

  return result;
}

export default mdls;
