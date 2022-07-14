export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  return keys.reduce((val, k) => {
    val[k] = obj[k]
    return val
  }, {} as T)
}
