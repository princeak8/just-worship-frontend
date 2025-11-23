import Cookies from 'js-cookie';
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const { VITE_BASE_URL, VITE_ENVIRONMENT } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiClient = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: () => ({}),
});

let DOMAIN_API_URL = "";
const adminCookie = Cookies.get("token");
if (adminCookie) {
  try {
    const adminData = JSON.parse(adminCookie);
    DOMAIN_API_URL =
      VITE_ENVIRONMENT === 'local'
        ? `http://${adminData?.domain}`
        : `https://${adminData?.domain}`;
  } catch (error) {
    console.error("Error parsing admin cookie for DOMAIN_API_URL:", error);
  }
}

export { DOMAIN_API_URL };
