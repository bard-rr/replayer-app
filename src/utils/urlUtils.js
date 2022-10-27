import axios from "axios";
import { BASE_URL } from "./const";

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
  return `${BASE_URL}/funnels?${pageQuery}&${sortQuery}`;
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
