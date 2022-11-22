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

async function mdls(path: string): Promise<MetadataAttributes>;
async function mdls<T extends MetadataAttributeKeyArray>(
  path: string,
  attributes: T
): Promise<MetadataObjectFromArray<T>>;
async function mdls(path: string, attributes?: MetadataAttributeKeyArray) {
  if (process.platform !== "darwin")
    throw new Error(process.platform + " is not supported.");

  const names = attributes?.map((a) => `-name ${a}`).join(" ");

  const { stdout } = await exec(`/usr/bin/mdls ${names ?? ""} ${path}`);

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
