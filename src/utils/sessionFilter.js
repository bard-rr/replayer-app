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

export default filterSessions;
