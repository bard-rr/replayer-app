import { BASE_URL } from "./const";
import { getFilterQuery } from "./sessionFilter";

export const getFullUrl = (pageObj, sortObj, filterObj) => {
  let filterQuery = getFilterQuery(filterObj);
  let pageQuery = getPageQuery(pageObj);
  //let sortQuery = getSortQuery(sortObj);
  let finalUrl = BASE_URL + "/sessions?" + filterQuery + "&" + pageQuery; //+ "&" + sortQuery
  return finalUrl;
};

export const getQueryString = (obj) => {
  return new URLSearchParams(obj).toString();
};

export const getPageQuery = (pageObj) => {
  return getQueryString(pageObj);
};
