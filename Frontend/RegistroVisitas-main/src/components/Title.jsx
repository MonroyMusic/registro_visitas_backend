import React from "react";

export const Title = ({ children }) => (
  <h1
    style={{ marginBottom: "1rem" }}
    className="flex text-justify items-center text-white text-3xl ml-20 mt-14 font-bold"
  >
    {children}
  </h1>
);
