import React from "react";


const SingleEntryBox = (props) => {
  console.log(props.entry);

  return (
    <div>
      {props.entry.weight} at {props.entry.reps} on date {props.entry.date}

    </div>
  );
};

export default SingleEntryBox;
