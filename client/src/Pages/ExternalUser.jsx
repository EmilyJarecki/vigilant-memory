import React, { useEffect, useState } from "react";
import { getSpecificProfile } from "../Services/profileService";
import { useParams } from "react-router-dom";

const ExternalUser = () => {
  const { id } = useParams();

  console.log(id)
  const [user, setUser] = useState({});

  useEffect(() => {
    const getExternalUser = async () => {
      try {
        const individual = await getSpecificProfile(id);
        setUser(individual);
      } catch (error) {
        console.error(error);
      }
    };
    getExternalUser();
  }, [id]);

  console.log("user:", user)

  return ( <div>
  <h1>External User</h1>

  {user.firstName} {user.lastName}
  </div>);
};

export default ExternalUser;
