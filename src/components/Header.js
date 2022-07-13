import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export default function Header() {
  // const [user, setUser] = useState({});

  // const navigate = useNavigate();

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

  // const logout = async () => {
  //   await signOut(auth);
  //   navigate("/login");
  // };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" aria-current="page" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
            {/* {user?.uid === undefined ? (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </>
            ) : (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
                aria-current="page"
              >
                Logout
              </a>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
}
