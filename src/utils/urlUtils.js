import axios from "axios";
import { BASE_URL } from "./const";
import { fakeFunnel } from "../fakeData";

export const getNewSessions = async (
  page,
  rowsPerPage,
  filterTag,
  filterData,
  sortObj
) => {
  const url = getFullUrl({ pageNum: page, perPage: rowsPerPage }, sortObj, {
    filterTag,
    filterData,
  });
  console.log(url);
  const response = await axios.get(url);
  return response.data;
};

const getFullUrl = (pageObj, sortObj, filterObj) => {
  const filterTag = `tag=${filterObj.filterTag}`;
  const filterQuery = getQueryString(filterObj.filterData);
  const pageQuery = getQueryString(pageObj);
  const sortQuery = getQueryString(sortObj);
  const finalUrl =
    BASE_URL +
    "/sessions?" +
    filterTag +
    "&" +
    filterQuery +
    "&" +
    pageQuery +
    "&" +
    sortQuery;
  return finalUrl;
};

export const getQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};

export const getNewFunnels = async (page, rowsPerPage, sortObj) => {
  const pageQuery = getQueryString({ pageNum: page, perPage: rowsPerPage });
  const sortQuery = getQueryString(sortObj);
  return `${BASE_URL}/funnels?${pageQuery}&${sortQuery}`;
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

    // totoggle
    return fakeFunnel;
    // const response = await axios.get(url);
    // return response.data;
  } catch (error) {
    console.error(error);
  }
};
