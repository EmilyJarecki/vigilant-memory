import React from "react";
import { useEffect } from "react";
import { getUserToken } from "../utils/authToken";
import { Link } from "react-router-dom";

const CreateEntry = () => {
  const token = getUserToken();
  const URL = "http://localhost:4000/";


  const createEntry = async () => {
    //   console.log("Emily hdjkashkdjA");

    const raw = JSON.stringify({
      fruit: "pepper",
      subFruit: "jalapeno",
      rating: 4,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(URL, requestOptions);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
  }, [token]);

  return (
    <div>
      <button onClick={createEntry}>Click me</button>
    </div>
  );
};

export default CreateEntry;
