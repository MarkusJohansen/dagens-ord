const notNull = <T>(value: T | undefined | null, name: string): T => {
  if (value == null) {
    throw new TypeError(`${name} cannot be nullable! Value: ${value}`);
  }
  return value;
};

export const config = {
  API_URL: notNull(import.meta.env.VITE_API_URL, "meta.env.VITE_API_URL"),
} as const;
