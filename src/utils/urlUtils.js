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
  const url = getFullUrl({ pageNum: page, perPage: rowsPerPage }, sortObj, {
    filterTag,
    filterStr,
  });

  const response = await axios.get(url);
  return response.data;
};

const getFullUrl = (pageObj, sortObj, filterObj) => {
  const filterQuery = getFilterQuery(filterObj);
  const pageQuery = getQueryString(pageObj);
  const sortQuery = getQueryString(sortObj);
  const finalUrl =
    BASE_URL + "/sessions?" + filterQuery + "&" + pageQuery + "&" + sortQuery;
  return finalUrl;
};

export const getQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};
