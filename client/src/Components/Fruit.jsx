import React, { useEffect } from "react";
import { useState } from "react";
import { getUserToken } from "../utils/authToken";

const Fruit = () => {
  const [entry, setEntry] = useState([]);

  const token = getUserToken();
  const URL = "http://localhost:4000/";

  useEffect(() => {
    const getFruitEntries = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
      };

      try {
        const response = await fetch(URL, requestOptions);
        const allEntries = await response.json();
        setEntry(allEntries);
      } catch (error) {
        console.error(error);
      }
    };
    getFruitEntries();
  }, [token]);

  return (
    <div>
      {entry?.map((fruitEntry) => {
        return (
          <div key={fruitEntry._id} style={{border: "3px solid red"}}>
            <h1>{fruitEntry.fruit}</h1>
            <p>{fruitEntry.subFruit}</p>
            <p>Rating: {fruitEntry.rating}</p>
            <p>Season: {fruitEntry.season}</p>
            <p>Explanation: {fruitEntry.explanation}</p>
            <img style={{width: "100px"}} src={fruitEntry.image} alt={fruitEntry.subFruit}/>

          </div>
          
          );
      })}
    </div>
  );
};

export default Fruit;
