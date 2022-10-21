import { BASE_URL, FILTER_OPTIONS } from "./const";
import { getQueryString } from "./urlUtils";

const filterSessions = (sessions, filterTag) => {
  switch (filterTag) {
    case "today":
      return filterByToday(sessions);
    case "yesterday":
      return filterByYesterday(sessions);
    case "week":
      return filterByThisWeek(sessions);
    default:
      return sessions;
  }
};

const filterByToday = (sessions) => {
  const today = new Date().toLocaleDateString();
  return sessions.filter(({ date }) => date === today);
};

const filterByYesterday = (sessions) => {
  const today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toLocaleDateString();
  return sessions.filter(({ date }) => date === yesterday);
};

const filterByThisWeek = (sessions) => {
  const today = new Date();
  let lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);
  lastWeek = lastWeek.toLocaleDateString();
  return sessions.filter(({ date }) => date >= lastWeek);
};

export const getFilterQuery = ({ filterTag, filterStr }) => {
  //TODO: build this out in the future.
  switch (filterTag) {
    case "date":
      return getFilterByDateQuery(filterStr);
    default:
      return getDefaultFilterQuery();
  }
};

const getFilterByDateQuery = (filterStr) => {
  switch (filterStr) {
    case "Today":
      return buildDateQuery(getToday(), getToday());
    case "Yesterday":
      return buildDateQuery(yesterday(), yesterday());
    case "Last Week":
      return buildDateQuery(aWeekAgo(), getToday());
    case "All Sessions":
      return buildDateQuery(get1970(), getToday());
    default:
      return getDefaultFilterQuery();
  }
};

const getDefaultFilterQuery = () => {
  return buildDateQuery(getToday(), getToday());
};

const buildDateQuery = (startDate, endDate) => {
  let startStr = getDateStr(startDate);
  let endStr = getDateStr(endDate);
  let filterObj = {
    tag: "date",
    startDate: startStr,
    endDate: endStr,
  };
  return getQueryString(filterObj);
};

const getDateStr = (ms) => {
  let date = new Date(ms);
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();
  return `${year.toString()}-${month.toString()}-${day.toString()}`;
};

const getToday = () => {
  return Date.now();
};
const yesterday = () => {
  let today = new Date(getToday());
  return today.setDate(today.getDate() - 1);
};
const aWeekAgo = () => {
  let today = new Date(getToday());
  return today.setDate(today.getDate() - 7);
};
const get1970 = () => {
  return 0;
};

export default filterSessions;
