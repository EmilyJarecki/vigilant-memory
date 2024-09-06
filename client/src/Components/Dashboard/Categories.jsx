import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Categories = ({categoryList}) => {

  return (
    <div className="container flex justify-center">
      <div className="row flex justify-center div-class">
        {categoryList?.map((cat) => {
          return (
            <div className="col-sm-9 col-md-3 col-lg-2 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-sky-500 hover:ring-sky-500 category-container" key={cat._id}>
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
