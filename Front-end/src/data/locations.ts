import type { CountryOption } from "../types/product";

export const COUNTRIES: CountryOption[] = [
  {
    code: "US",
    name: "United States",
    phoneCode: "+1",
    states: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "District of Columbia",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ],
  },
  {
    code: "DE",
    name: "Germany",
    phoneCode: "+49",
    states: [
      "Baden-Württemberg",
      "Bavaria",
      "Berlin",
      "Brandenburg",
      "Bremen",
      "Hamburg",
      "Hesse",
      "Lower Saxony",
      "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia",
      "Rhineland-Palatinate",
      "Saarland",
      "Saxony",
      "Saxony-Anhalt",
      "Schleswig-Holstein",
      "Thuringia",
    ],
  },
];

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
