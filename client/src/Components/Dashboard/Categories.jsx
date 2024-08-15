import React, { useEffect, useState } from "react";
import { getUserToken } from "../../utils/authToken";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Categories = () => {
  const [category, setCategory] = useState([]);

  const token = getUserToken();
  const URL = "http://localhost:4000/category";

  useEffect(() => {
    const getCategories = async () => {
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
        const allCategories = await response.json();
        setCategory(allCategories);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, [token]);

  return (
    <div class="container flex justify-center">
      <div class="row flex justify-center div-class">
        {category?.map((cat) => {
          return (
            <div class="col-sm-9 col-md-3 col-lg-2 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-sky-500 hover:ring-sky-500 category-container" key={cat._id}>
              <Link to={`/entry/${cat._id}`}>
                <div key={cat._id}>
                  <h1>
                    {cat.name}
                  </h1>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
