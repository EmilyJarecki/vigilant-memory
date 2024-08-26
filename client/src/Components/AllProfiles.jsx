import React, { useEffect, useState } from "react";

const AllProfiles = ({ allProfiles }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (allProfiles) {
      setProfiles(allProfiles);
    }
  }, [allProfiles]);

  return (
    <div>
    <br></br>
      <h1>AllProfiles</h1>
        {profiles.map((elem) => (
      <div key={elem._id}>
          <p>USERNAME: {elem.username}</p>
      </div>
        ))}
    </div>
  );
};

export default AllProfiles;
