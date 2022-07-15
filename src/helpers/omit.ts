export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const newObj = { ...obj };

  keys.forEach((k) => delete newObj[k]);

  return newObj;
}
