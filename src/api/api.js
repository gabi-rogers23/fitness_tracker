//This file will be for all functions making calls to the API i.e fetch, post etc.

export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com";

function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("auth_token");
  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
  console.log("Current Headers: " + JSON.stringify(headers));
  return headers;
}

export async function registerNewUser(newUserName, newPassword) {
  const sendData = {
    user: { username: newUserName, password: newPassword },
  };
  console.log(sendData);
  console.log(JSON.stringify(sendData));
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    localStorage.setItem("auth_token", data.data.token);

    console.log(data);
  } catch (error) {
    throw error;
  }
}

