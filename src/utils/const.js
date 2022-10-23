export const BASE_URL = "http://localhost:3003";
const today = new Date().toISOString().substring(0, 10);

export const DEFAULT_TAG = "date";
export const DEFAULT_FILTER = { start_date: "1970-01-01", end_date: today };

export const DEFAULT_SORT_STATE = {
  sortBy: "date",
  sortOrder: "descending",
};

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 5;

export const SEC_TO_MS = 1000;
export const MIN_TO_MS = 60 * SEC_TO_MS;
export const HRS_TO_MS = 60 * MIN_TO_MS;
export const DEFAULT_TIME_STRING = "00";
