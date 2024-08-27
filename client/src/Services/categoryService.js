import * as tokenService from "./tokenService";

// being used :)
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

  // being used :)
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

export {  getCategories, getCategoryTitleById };
