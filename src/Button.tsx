import React, { Children } from "react";
interface props {
  children: string;
  color?: string;
  onclick: () => void;
}

export const Button = ({ children, onclick, color = "secondary" }: props) => {
  return (
    <button className={"btn btn-" + color} onClick={onclick}>
      {children}
    </button>
  );
};
