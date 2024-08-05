import { useParams, useNavigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUserToken } from "../utils/authToken";

const SingleEntry = (props) => {
  const token = getUserToken();
  const [entry, setEntry] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const URL = `http://localhost:4000/${id}`;

  const deleteEntry = async (e) => {

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow"
    };

    try {
      const response = await fetch(URL, options);
      const result = await response.json();
      console.log(result)
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getSingleEntry = async () => {
      try {
        const response = await fetch(URL);
        const singleEntry = await response.json();
        setEntry(singleEntry);
      } catch (error) {
        console.error(error);
      }
    };
    getSingleEntry();
  }, [URL]);

  return (
    <div>
      {entry ? (
        <div>
          <button onClick={deleteEntry}>Delete</button>
          <p>
            <strong>Lift:</strong> {entry.lift}
          </p>
          <p>
            <strong>Reps:</strong> {entry.reps}
          </p>
          <p>
            <strong>Weight:</strong> {entry.weight}
          </p>
          <p>
            <strong>Difficulty:</strong> {entry.difficulty}
          </p>
          <p>
            <strong>Date:</strong> {entry.date}
          </p>
          <p>
            <strong>Notes:</strong> {entry.notes}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SingleEntry;
