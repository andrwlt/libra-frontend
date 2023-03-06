export const shortStr = (str: string) => `${str.slice(0, 6)}...${str.slice(-4)}`;

export function truncate(address: string, config?: { start: number; end: number }) {
  const start = config?.start ?? 6;
  const end = config?.end ?? 6;
  return `${address.slice(0, start)} ... ${address.slice(-end)}`;
}
