import * as tokenService from "./tokenService";
const BASE_URL = "http://localhost:4000/auth";

const show = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const res = await fetch(`${BASE_URL}/self`, requestOptions); 
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

async function getAllProfiles() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const res = await fetch(`${BASE_URL}/profiles`, requestOptions);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const allProfilesExceptSelf = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const res = await fetch(`${BASE_URL}/filtered/${id}`, requestOptions); 
    console.log(res)
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

const getUserFriends = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const res = await fetch(`${BASE_URL}/friends`, requestOptions); 
    console.log("friends res", res)
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
export { show, getAllProfiles, allProfilesExceptSelf, getUserFriends };
