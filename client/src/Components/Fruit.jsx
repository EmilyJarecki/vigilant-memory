import React from "react";

const Fruit = () => {
  const getFruits = async () => {
    const URL = "http://localhost:3000/";
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    };

    try {
      const res = await fetch(URL, requestOptions);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await res.text();
        throw new Error(`Expected JSON but got ${contentType}: ${errorText}`);
      }
      const allFruits = await res.json();
      console.log(allFruits);
      return allFruits;
    } catch (error) {
      console.log(error);
    }
  };

  getFruits();

  return <div>Fruit</div>;
};

export default Fruit;
