import axios from "axios";
import { ALL_EVENT_OPTIONS, ALL_FILTER_OPTIONS, BASE_URL } from "./const";
// import { fakeFunnel } from "../fakeData";

export const getNewSessions = async (
  page,
  rowsPerPage,
  filterData,
  sortObj
) => {
  const url = getFullUrl(
    { pageNum: page, perPage: rowsPerPage },
    sortObj,
    filterData
  );
  const response = await axios.get(url);
  return response.data;
};

const getFullUrl = (pageObj, sortObj, filterData) => {
  const filterQuery = parseFilterQuery(filterData);
  const pageQuery = getQueryString(pageObj);
  const sortQuery = getQueryString(sortObj);
  const finalUrl =
    BASE_URL + "/sessions?" + filterQuery + "&" + pageQuery + "&" + sortQuery;
  return finalUrl;
};

const getQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};

export const getNewFunnels = async (page, rowsPerPage, sortObj) => {
  const pageQuery = getQueryString({ pageNum: page, perPage: rowsPerPage });
  const sortQuery = getQueryString(sortObj);
  const url = `${BASE_URL}/funnels?${pageQuery}&${sortQuery}`;
  return await axios.get(url);
};

const parseFilterQuery = (filterData) => {
  let queryPieces = [];
  filterData.forEach((filterObj, i) => {
    Object.keys(filterObj).forEach((key) => {
      let value = filterObj[key];
      if (key === "filterType") {
        key = `filter_${i}`;
      }
      let queryObj = {};
      queryObj[key] = value;
      queryPieces.push(getQueryString(queryObj));
    });
  });
  return queryPieces.join("&");
};

export const getEventData = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/sessions/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFunnelData = async (id, filter) => {
  try {
    const params = getQueryString(filter);
    const url = `${BASE_URL}/funnels/${id}?${params}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getOneFunnel = async (id) => {
  try {
    const url = `${BASE_URL}/funnel/${id}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createOneFunnel = async (funnelObj) => {
  try {
    const url = `${BASE_URL}/funnels`;
    await axios.post(url, funnelObj);
  } catch (error) {
    console.error(error);
  }
};

export const updateOneFunnel = async (id, newFunnelObj) => {
  try {
    const url = `${BASE_URL}/funnels/${id}`;
    await axios.put(url, newFunnelObj);
  } catch (error) {
    console.error(error);
  }
};

export const deleteOneFunnel = async (id) => {
  try {
    const url = `${BASE_URL}/funnels/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.error(error);
  }
};

export const getFilterOptionsFor = async (filterType) => {
  try {
    if (!ALL_FILTER_OPTIONS.includes(filterType)) {
      throw new Error("Invalid filter type");
    }
    const url = `${BASE_URL}/options/filter?filterType=${filterType}`;
    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getFunnelOptionsFor = async (eventType) => {
  try {
    if (!ALL_EVENT_OPTIONS.includes(eventType)) {
      throw new Error("Invalid event type");
    }
    const url = `${BASE_URL}/options/funnel?eventType=${eventType}`;
    let { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
  }
};
