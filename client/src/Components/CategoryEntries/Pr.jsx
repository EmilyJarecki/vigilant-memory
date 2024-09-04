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
    <div className="flex items-center flex-col mt-4">
    
      <div className="border-4 w-64 h-[128px] p-2">
       Personal Record: 
       <div>
          <h1 className="text-xl font-bold">{props?.maxObj?.weight}</h1> set on <p className="font-bold">{props?.maxObj?.date}</p>
        </div>
      </div>
    </div>
  );
};

export default Pr;
