import { HRS_TO_MS, MIN_TO_MS, SEC_TO_MS } from "../utils/const";

const padTime = (num) => String(num).padStart(2, "0");

export const msToTime = (duration) => {
  let seconds = Math.floor(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  hours = padTime(hours);
  minutes = padTime(minutes % 60);
  seconds = padTime(seconds % 60);

  return `${hours}:${minutes}:${seconds}`;
};

export const toMilliseconds = (hrs, mins, secs) => {
  return hrs * HRS_TO_MS + mins * MIN_TO_MS + secs * SEC_TO_MS;
};

export const msToSeconds = (duration) => {
  let seconds = Math.floor(duration / 1000);
  return padTime(seconds % 60);
};

export const msToMinutes = (duration) => {
  let seconds = Math.floor(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  return padTime(minutes % 60);
};

export const msToHours = (duration) => {
  let seconds = Math.floor(duration / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  return padTime(hours);
};
