import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const styles = {
  display: "inline-block",
  width: "200px",
  padding: "10px",
  margin: "0 10px 10px",
  color: "white",
  fontSize: "20px",
};

function NavBar({ setUser, user }) {
  const navigate = useNavigate();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/");
      }
    });
  }

  return (
    <div className="navi">
      <div className="header">
        <h2>Na-grow</h2>
      </div>
      <NavLink className="navs" to="/" exact style={styles}>
        Home
      </NavLink>
      <NavLink className="navs" to="/new" exact style={styles}>
        Add New Plant
      </NavLink>
      <NavLink className="navs" to="/mylist" exact style={styles}>
        My List
      </NavLink>
      <NavLink className="navs" to="/login" exact style={styles}>
        {user ? `Hi! ${user.username}` : "Login"}
      </NavLink>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default NavBar;
