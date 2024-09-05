import * as tokenService from "./tokenService";

const getCategories = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:4000/category", requestOptions);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryTitleById = async (id) => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:4000/category/${id}`, requestOptions);
      const title = await response.json();
      return title
    } catch (error) {
      console.error(error);
    }
  };

  // function to get lifts by category and reps
const getPersonalEntryByCategoryAndReps= async (categoryId, reps)=>{
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    redirect: "follow",
  };

  try {
    const response = await fetch(`http://localhost:4000/auth/filtered-category/${categoryId}/${reps}`, requestOptions);
    const filteredEntries = await response.json();
    // console.log("filteredEntries", filteredEntries)
    return filteredEntries
  } catch (error) {
    console.error(error);
  }
}
export {  getCategories, getCategoryTitleById, getPersonalEntryByCategoryAndReps };
