import axios from "axios";

export const axiosInstance = axios.create({});
const BASE_URL = "http://localhost:8000";

type methodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const apiConnector = async (
  method: methodType,
  url: string,
  bodyData?: object
) => {
  const options = {
    method,
    url,
    data: bodyData,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (response: any) => {
    return response?.data;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    return Promise.reject(error?.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
