import { BASE_URL } from "./const";

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

export const getFilterUrl = (filterTag, filterStr) => {
  //TODO: build this out in the future.
  switch (filterTag) {
    case "date":
      return getFilterByDateUrl(filterStr);
    default:
      return getDefaultFilterUrl();
  }
};

const getQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};

const getFilterByDateUrl = (filterStr) => {
  switch (filterStr) {
    case "Today":
      return buildDateUrl(getToday(), getToday());
    case "Yesterday":
      return buildDateUrl(yesterday(), yesterday());
    case "Last Week":
      return buildDateUrl(aWeekAgo(), getToday());
    case "All Sessions":
      return buildDateUrl(get1970(), getToday());
    default:
      return getDefaultFilterUrl();
  }
};

const getDefaultFilterUrl = () => {
  return buildDateUrl(getToday(), getToday());
};

const buildDateUrl = (startDate, endDate) => {
  let startStr = getDateStr(startDate);
  let endStr = getDateStr(endDate);
  let filterObj = {
    tag: "date",
    startDate: startStr,
    endDate: endStr,
  };
  let queryString = getQueryString(filterObj);
  return BASE_URL + `/sessions?${queryString}`;
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
