import React from "react";

import '../assets/spinner.css'

const Spinner = ({ width, height, color }) => {
  return (
      <span className={`loader w-[${width}] h-[${height}] ${color} `}></span>
  );
};

export default Spinner;
