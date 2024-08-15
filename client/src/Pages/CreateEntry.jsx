import React, {useEffect, useState} from "react";
import CreateEntryForm from "../Components/Entry Forms/CreateEntryForm";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getUserToken } from "../utils/authToken";
import { Button } from "reactstrap";

const CreateEntry = () => {
  const { id } = useParams();
  const URL = `http://localhost:4000/category/${id}`;
  const token = getUserToken();
  const [title, setTitle] = useState(null);

  useEffect(() => {
    // get category title
    const categoryTitle = async () => {
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
          const title = await response.json();
          console.log(title)
          setTitle(title.name);
        } catch (error) {
          console.error(error);
        }
      };
      categoryTitle();
  }, [URL])
  return (
    <div>
      <Link to={`/entry/${id}`}><Button color="primary" outline className="mb-4 me-2">Back</Button></Link>
      <h1 class="text-xl font-bold mb-4 update-title-min">Create Entry for </h1>
      <p class="update-title">{title}</p>
      <CreateEntryForm title={title} categoryId={`${id}`} />
    </div>
  );
};

export default CreateEntry;
