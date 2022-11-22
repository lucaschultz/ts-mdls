export default function parseString(value: string) {
  if (value[0] === '"' && value[value.length - 1] === '"') {
    return value.slice(1, -1);
  } else {
    return value;
  }
}
