import React from "react";
import { NavLink, UseHistory } from "react-router-dom";

const styles = {
  display: "inline-block",
  width: "200px",
  padding: "10px",
  margin: "0 10px 10px",
  background: "blue",
  color: "white",
  fontSize: "20px",
};

function NavBar({ setUser, user }) {
  const history = UseHistory();

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push("/");
      }
    });
  }

  return (
    <div>
      <NavLink
        to="/"
        exact
        style={styles}
        activeStyle={{
          background: "pink",
          color: "black",
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/new"
        exact
        style={styles}
        activeStyle={{
          background: "pink",
          color: "black",
        }}
      >
        Add New Plant
      </NavLink>
      <NavLink
        to="/mylist"
        exact
        style={styles}
        activeStyle={{
          background: "pink",
          color: "black",
        }}
      >
        My List
      </NavLink>
      <NavLink
        to="/login"
        exact
        style={styles}
        activeStyle={{
          background: "pink",
          color: "black",
        }}
      >
        {user ? `Hi! ${user.username}` : "Login"}
      </NavLink>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default NavBar;
