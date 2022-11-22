# ts-mdls

Lightweigth, dependency free, fully typed wrapper of the macOS [`mdls`](https://developer.apple.com/library/Mac/documentation/Darwin/Reference/ManPages/man1/mdls.1.html) command.

## Install

`npm install ts-mdls`

## Usage

The package exports exactly one function which supports the following two signatures

### Basic example

```ts
(async () => {
  try {
    const data = await mdls("./src/index.ts");
  } catch (error) {
    console.log(error);
  }
})();
```

After awaiting the Promise, `data` will be an object of Type `MetadataAttributes`:

```ts
{
  _kMDItemDisplayNameWithExtensions: 'index.ts',
  kMDItemContentCreationDate: new Date('2022-11-22T10:07:30.000Z'),
  kMDItemContentCreationDate_Ranking: new Date('2022-11-22T00:00:00.000Z'),
  kMDItemContentModificationDate: new Date('2022-11-22T14:41:18.000Z'),
  kMDItemContentModificationDate_Ranking: new Date('2022-11-22T00:00:00.000Z'),
  kMDItemContentType: 'public.mpeg-2-transport-stream',
  kMDItemContentTypeTree: [
    'public.mpeg-2-transport-stream',
    'public.movie',
    'public.audiovisual-content',
    'public.data',
    'public.item',
    'public.content'
  ],
  kMDItemDateAdded: new Date('2022-11-22T10:07:30.000Z'),
  kMDItemDateAdded_Ranking: new Date('2022-11-22T00:00:00.000Z'),
  kMDItemDisplayName: 'index.ts',
  kMDItemDocumentIdentifier: 0,
  kMDItemFSContentChangeDate: new Date('2022-11-22T14:41:18.000Z'),
  kMDItemFSCreationDate: new Date('2022-11-22T10:07:30.000Z'),
  kMDItemFSCreatorCode: '',
  kMDItemFSFinderFlags: 0,
  kMDItemFSHasCustomIcon: null,
  kMDItemFSInvisible: false,
  kMDItemFSIsExtensionHidden: false,
  kMDItemFSIsStationery: null,
  kMDItemFSLabel: 0,
  kMDItemFSName: 'index.ts',
  kMDItemFSNodeCount: null,
  kMDItemFSOwnerGroupID: 20,
  kMDItemFSOwnerUserID: 501,
  kMDItemFSSize: 265,
  kMDItemFSTypeCode: '',
  kMDItemInterestingDate_Ranking: new Date('2022-11-22T00:00:00.000Z'),
  kMDItemKind: 'Typescript',
  kMDItemLogicalSize: 265,
  kMDItemPhysicalSize: 4096
}
```

Running `mdls` the command line utility would have returned:

```text
_kMDItemDisplayNameWithExtensions      = "index.ts"
kMDItemContentCreationDate             = 2022-11-22 10:07:30 +0000
kMDItemContentCreationDate_Ranking     = 2022-11-22 00:00:00 +0000
kMDItemContentModificationDate         = 2022-11-22 14:41:28 +0000
kMDItemContentModificationDate_Ranking = 2022-11-22 00:00:00 +0000
kMDItemContentType                     = "public.mpeg-2-transport-stream"
kMDItemContentTypeTree                 = (
    "public.mpeg-2-transport-stream",
    "public.movie",
    "public.audiovisual-content",
    "public.data",
    "public.item",
    "public.content"
)
kMDItemDateAdded                       = 2022-11-22 10:07:30 +0000
kMDItemDateAdded_Ranking               = 2022-11-22 00:00:00 +0000
kMDItemDisplayName                     = "index.ts"
kMDItemDocumentIdentifier              = 0
kMDItemFSContentChangeDate             = 2022-11-22 14:41:28 +0000
kMDItemFSCreationDate                  = 2022-11-22 10:07:30 +0000
kMDItemFSCreatorCode                   = ""
kMDItemFSFinderFlags                   = 0
kMDItemFSHasCustomIcon                 = (null)
kMDItemFSInvisible                     = 0
kMDItemFSIsExtensionHidden             = 0
kMDItemFSIsStationery                  = (null)
kMDItemFSLabel                         = 0
kMDItemFSName                          = "index.ts"
kMDItemFSNodeCount                     = (null)
kMDItemFSOwnerGroupID                  = 20
kMDItemFSOwnerUserID                   = 501
kMDItemFSSize                          = 241
kMDItemFSTypeCode                      = ""
kMDItemInterestingDate_Ranking         = 2022-11-22 00:00:00 +0000
kMDItemKind                            = "Typescript"
kMDItemLogicalSize                     = 241
kMDItemPhysicalSize                    = 4096
```

### Example with arguments

You can also pass in arguments (as Array of `MetadataAttributeKey`):

```ts
(async () => {
  try {
    const data = await mdls("./src/index.ts", [
      "kMDItemUserTags",
      "kMDItemFSCreationDate",
    ]);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
})();
```

When using Typescript, `mdls` won't allow the use of an unsopported `MetadataAttributeKey`. The return type of the example `mdls` call is:

```ts
type ReturnTypeOfExample = {
  kMDItemFSCreationDate: Date | null,
  kMDItemUserTags: string[] | null
}
```

The actual `data` object is:

```ts
{
  kMDItemFSCreationDate: new Date('2022-11-22T10:07:30.000Z'),
  kMDItemUserTags: null
}
```

## Supported Metadata Atttributes

The supported metadata attributes are defined in [`metadataAttributeParsers.ts`](/src/utilities/metadataAttributeParsers.ts). To add support for an attribute, add a `key: parser` mapping to the `metadataAttributeParsers` object in [`metadataAttributeParsers.ts`](/src/utilities/metadataAttributeParsers.ts).
