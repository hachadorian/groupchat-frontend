import React from "react";
import { Link } from "react-router-dom";

const Wrapper = ({ children, header, subtext, linkLabel, link, linkText }) => {
  return (
    <div className="md:border rounded-2xl px-12">
      <div className="font-bold py-8">{header}</div>
      {subtext ? <div className="pb-5">{subtext}</div> : null}
      {children}
      <div className="flex justify-center pb-10">
        {linkLabel}
        {link ? (
          <Link className="text-blue-500 underline" to={link}>
            {linkText}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Wrapper;
