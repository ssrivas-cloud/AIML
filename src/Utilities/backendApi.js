import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const fetchBackendDataFromApi = async (
  method,
  url,
  params,
  cancelToken
) => {
  const config = {
    headers: headers,
    cancelToken: cancelToken,
  };

  try {
    let response;
    if (method === "POST") {
      response = await axios.post(BASE_URL + url, params, config);
    } else if (method === "DELETE") {
      response = await axios.delete(BASE_URL + url, {
        ...config,
        data: params,
      });
    } else if (method === "GET") {
      response = await axios.get(BASE_URL + url, {
        ...config,
        data: params,
      });
    }
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request cancelled", error.message);
    } else {
      console.log(error);
    }
    return error;
  }
};
