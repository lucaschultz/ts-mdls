import { metadatAttributeParsers } from "./utilities/metadataAttributeParsers";

export type MetadataAttributeParsers = typeof metadatAttributeParsers;

export type MetadataAttributes = {
  [A in keyof MetadataAttributeParsers]+?: ReturnType<
    MetadataAttributeParsers[A]
  >;
};

type MetadataAttributeKey = keyof MetadataAttributes;

export type MetadataAttributeKeyArray = ReadonlyArray<MetadataAttributeKey>;

export type MetadataObjectFromArray<T extends MetadataAttributeKeyArray> = {
  [Key in T[number]]: NonNullable<MetadataAttributes[Key]> | null;
};
