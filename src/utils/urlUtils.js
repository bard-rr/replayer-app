import axios from "axios";
import { BASE_URL } from "./const";

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
