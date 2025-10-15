import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyle = ({ isActive }) => ({
    padding: "8px 16px",
    borderRadius: "6px",
    backgroundColor: isActive ? "#2563eb" : "transparent",
    color: isActive ? "white" : "#1e3a8a",
    textDecoration: "none",
    fontWeight: 500,
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#f3f4f6",
        padding: "12px",
      }}
    >
      <NavLink to="/todos" style={linkStyle}>
        Tất cả công việc
      </NavLink>
      <NavLink to="/important" style={linkStyle}>
        Công việc quan trọng
      </NavLink>
    </nav>
  );
};

export default Navbar;
