import axios from "axios";
import { BASE_URL } from "./const";
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
    console.log(`Funnel URL: ${url}`);
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
    //console.log("delete request to ", url);
    await axios.delete(url);
  } catch (error) {
    console.error(error);
  }
};
