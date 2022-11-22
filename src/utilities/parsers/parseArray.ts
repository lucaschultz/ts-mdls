import checkNull from "./checkNull";
import parseString from "./parseString";

export default function parseArray<T>(valueParser: (value: string) => T) {
  return (arrayString: string) => {
    return arrayString
      .slice(2, -2)
      .split(",\n")
      .map((s) => s.replace(/^\s+/, ""))
      .map((v) => {
        const value = checkNull(parseString)(v);
        if (value === null) {
          return null;
        } else {
          return valueParser(value);
        }
      });
  };
}
