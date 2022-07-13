import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import Header from "../components/Header";

export default function Home() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <>
      {/* <Header /> */}
      <div className="container text-center">
        <h1 className="mt-3 mb-5">Home Page</h1>
        {user?.uid === undefined ? (
          <p>
            <Link to="/login">Login</Link> to view data
          </p>
        ) : (
          <div>
            <h3>Welcome</h3>
            <br />
            <h3>{user?.displayName}</h3>
            <h3>{user?.email}</h3>
            <button
              onClick={logout}
              className="btn mt-4 logoutbtn"
              style={{ border: "0.5px solid black" }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
