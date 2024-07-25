import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const fetchBackendDataFromApi = async (method, url, params) => {
  if (method === "POST") {
    try {
      const { data } = await axios.post(BASE_URL + url, params, {
        headers: headers,
      });
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else if (method === "DELETE") {
    try {
      const { data } = await axios.delete(BASE_URL + url, params, {
        headers: headers,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    try {
      const { data } = await axios.get(BASE_URL + url, params, {
        headers: headers,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};
