const getDateString = (date) => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getPastDate = (num) => {
  const date = new Date();
  date.setDate(date.getDate() - num);
  return date;
};

const getDates = (tag) => {
  const today = new Date();
  let startDate, endDate;
  switch (tag) {
    case "today":
      startDate = today;
      endDate = today;
      break;
    case "yesterday":
      startDate = getPastDate(1);
      endDate = getPastDate(1);
      break;
    case "last 7":
      startDate = today;
      endDate = getPastDate(7);
      break;
    case "last 30":
      startDate = today;
      endDate = getPastDate(30);
      break;
    default:
      startDate = today;
      endDate = getPastDate(7);
      break;
  }
  return {
    startDate: getDateString(startDate),
    endDate: getDateString(endDate),
  };
};

export default getDates;
