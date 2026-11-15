export function searchStatesByRelevance(
  states: string[],
  rawQuery: string,
): string[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return states;

  const scored = states
    .map((state) => {
      const lower = state.toLowerCase();
      let score = 0;

      if (lower === query) {
        score = 4;
      } else if (lower.startsWith(query)) {
        score = 3;
      } else if (lower.split(/[\s-]+/).some((word) => word.startsWith(query))) {
        score = 2;
      } else if (lower.includes(query)) {
        score = 1;
      }

      return { state, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.state.localeCompare(b.state));

  return scored.map((entry) => entry.state);
}
