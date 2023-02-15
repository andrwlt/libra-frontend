export default function truncate(address: string, { start = 6, end = 6 }: { start?: number; end?: number }) {
  return `${address.slice(0, start)} ... ${address.slice(-end)}`;
}
