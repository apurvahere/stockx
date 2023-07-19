import axios from "axios";

export const headers: any = {
  "Access-Control-Allow-Origin": "*",
  accept: "application/json",
  "Content-Type": "application/json",
};

export const parseError = (error: any) => {
  let message = "Please try again later!";

  if (!error.response) {
    console.log(message);
    return;
  }

  if (
    error.response.status &&
    (error.response.status === 404 ||
      (error.response.status >= 500 && error.response.status < 600))
  ) {
    return;
  }

  if (error && error.response && error.response.data) {
    message = error.response.data.message;
  } else if (error) {
    message = error;
  }

  if (message) {
    console.log(message);
  }
};

export const callEndpoint = async (
  url: string,
  method: any,
  data: any,
  token?: string
) => {
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await axios({
    url: url,
    method: method,
    data: data,
    headers: headers,
  })
    .then((res: any) => res.data)
    .catch((error: any) => parseError(error));
  return res;
};

export const callGet = async (url: string, token?: string) => {
  return callEndpoint(url, "get", {}, token);
};
