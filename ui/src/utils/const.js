const REPLAYER_API_HOSTNAME = document.location.hostname;
export const BASE_URL = `http://${REPLAYER_API_HOSTNAME}:3003/api`;
const today = new Date().toISOString().substring(0, 10);

export const DEFAULT_FILTER = {
  filterType: "date",
  startDate: "1970-01-01",
  endDate: today,
};

export const DEFAULT_SORT_STATE = {
  sortBy: "date",
  sortOrder: "descending",
};

export const DEFAULT_SORT_FUNNELS = {
  sortBy: "lastModified",
  sortOrder: "descending",
};

export const DEFAULT_PAGE = 0;
export const DEFAULT_LIMIT = 5;

export const SEC_TO_MS = 1000;
export const MIN_TO_MS = 60 * SEC_TO_MS;
export const HRS_TO_MS = 60 * MIN_TO_MS;
export const DEFAULT_TIME_STRING = "00";

export const DEFAULT_FUNNEL = { eventType: "" };
export const DEFAULT_FUNNEL_FILTER = {};

export const ALL_FILTER_OPTIONS = ["length", "date", "appName", "Has Errors?"];
export const ALL_EVENT_OPTIONS = ["click", "custom"];
