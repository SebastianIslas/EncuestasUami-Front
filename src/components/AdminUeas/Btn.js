import React from "react";

export function Btn({ btnFunction, text }) {
  return (
    <button className="btn btn-primary
                       btn-xs sm:btn-sm md:btn-md"
      onClick={() => { btnFunction(); }}>
      {text}</button>);
}
