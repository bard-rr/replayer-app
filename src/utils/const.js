export const BASE_URL = "http://localhost:3003";
export const FILTER_OPTIONS = [
  "Today",
  "Yesterday",
  "Last Week",
  "All Sessions",
];

export const DEFAULT_FILTER = FILTER_OPTIONS[3];

export const DEFAULT_SORT_STATE = {
  sortBy: "date",
  sortOrder: "descending",
};

export const DEFAULT_PAGE = 0;

export const SEC_TO_MS = 1000;
export const MIN_TO_MS = 60 * SEC_TO_MS;
export const HRS_TO_MS = 60 * MIN_TO_MS;
