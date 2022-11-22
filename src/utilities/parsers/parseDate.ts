import parseString from "./parseString";

export default function parseDate(value: string) {
  return new Date(parseString(value));
}
