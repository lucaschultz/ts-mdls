export class IsNotNullError extends Error {}

export default function parseNull(s: string) {
  if (s === "(null)") {
    return null;
  } else {
    throw new IsNotNullError();
  }
}
