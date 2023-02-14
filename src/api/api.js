//This file will be for all functions making calls to the API i.e fetch, post etc.

export const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("auth_token");
  console.log("CURRENT TOKEN IN GET HEADERS:, ", currentToken);

  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
  console.log("Current Headers: " + JSON.stringify(headers));
  return headers;
}

export async function registerNewUser(newUserName, newPassword) {
  const sendData = { username: newUserName, password: newPassword };

  console.log("REGISTER NEW USER: ", sendData);
  console.log("REGISTER NEW USER STRINGIFY", JSON.stringify(sendData));

  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    localStorage.setItem("auth_token", data.token);

    console.log("REGISTER NEW USER RETURNING:", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logIn(userUsername, userPassword) {
  const sendData = {
    username: userUsername,
    password: userPassword,
  };

  console.log("LogIn SEND Data " + sendData.username);

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    localStorage.setItem("auth_token", data.token);

    console.log("Login Data", data);
    console.log("GET HEADERS FROM LOGIN", getHeaders());
    return data;
  } catch (error) {
    throw error;
  }
}
