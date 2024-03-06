export const relativeShortTimeFormat = new Intl.RelativeTimeFormat("en", {
  style: "short",
  numeric: "auto",
});

export function formatRelativeTime(timeMs: number) {
  return relativeShortTimeFormat.format(
    Math.round((timeMs - Date.now()) / 1000 / 60 / 60 / 24),
    "day"
  );
}
