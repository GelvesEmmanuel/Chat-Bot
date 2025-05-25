import React from "react";
import "./BtnPrimary.css";

export const BtnPrimary = ({ children, ...props }) => (
  <button className="btn-primary" {...props}>{children}</button>
);

export const BtnSecondary = ({ children, ...props }) => (
  <button className="btn-secondary" {...props}>{children}</button>
);

export const BtnTertiary = ({ children, ...props }) => (
  <button className="btn-tertiary" {...props}>{children}</button>
);