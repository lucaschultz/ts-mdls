import parseNull, { IsNotNullError } from "./parseNull";

export default function checkNull<T>(parser: (value: string) => T) {
  return (value: string) => {
    try {
      return parseNull(value);
    } catch (maybeError) {
      if (maybeError instanceof IsNotNullError) {
        return parser(value);
      } else {
        throw maybeError;
      }
    }
  };
}
