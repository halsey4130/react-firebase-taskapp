import React from "react";

import classes from "./Navbar.module.css";

const Navbar = () => {
  // navbar, good for adding buttons for login, etc
  return (
    <div className={classes.navbar}>
      <h1>Tasks</h1>
    </div>
  );
};

export default Navbar;
