import axios from "axios";
import { BASE_URL } from "./const";
import { getFilterQuery } from "./sessionFilter";

export const getNewSessions = async (
  page,
  rowsPerPage,
  filterTag,
  filterStr,
  sortObj
) => {
  let url = getFullUrl({ pageNum: page, perPage: rowsPerPage }, sortObj, {
    filterTag,
    filterStr,
  });
  let response = await axios.get(url);
  return response.data;
};

const getFullUrl = (pageObj, sortObj, filterObj) => {
  let filterQuery = getFilterQuery(filterObj);
  let pageQuery = getQueryString(pageObj);
  let sortQuery = getQueryString(sortObj);
  let finalUrl =
    BASE_URL + "/sessions?" + filterQuery + "&" + pageQuery + "&" + sortQuery;
  return finalUrl;
};

export const getQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};
