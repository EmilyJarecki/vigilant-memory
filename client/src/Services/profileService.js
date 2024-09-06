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
    const result = await res.json();
    return result
  } catch (error) {
    console.log(error);
  }
}

const addFriend = async (id) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    }
  };

  try {
    const response = await fetch(`http://localhost:4000/profile/add-friend/${id}`, requestOptions);
    const result = await response.json();
    return result
  } catch (error) {
    console.error(error);
  }
};

const removeFriend = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(`${BASE_URL}/remove-friend/${id}`, requestOptions);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

// get specific profile
async function getSpecificProfile(id) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const res = await fetch(`http://localhost:4000/profile/${id}`, requestOptions);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// get specific profile, specific category, specific reps
async function getSpecificProfileCategoryReps(userId, categoryId, filterNum) {
  console.log(userId)
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const res = await fetch(`http://localhost:4000/profile/entry-by-category/${userId}/${categoryId}/${filterNum}`, requestOptions);
    console.log(res)
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}



export { show, getAllProfiles, allProfilesExceptSelf, getUserFriends, addFriend, removeFriend, getSpecificProfile, getSpecificProfileCategoryReps };
