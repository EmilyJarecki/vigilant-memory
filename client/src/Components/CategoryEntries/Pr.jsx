import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";

const Pr = (props) => {

  useEffect(() => {
    function loading() {
      if (!props.maxObj) {
        return (
          <div>
            <CircularProgress color="secondary" />
          </div>
        );
      }
    }
    loading();
  }, [props.maxObj]);

  return (
    <div>
      Personal Record:
      <div>
        {props?.maxObj?.weight} set on {props?.maxObj?.date}
      </div>
    </div>
  );
};

export default Pr;
