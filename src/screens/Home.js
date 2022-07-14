import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import Header from "../components/Header";

export default function Home() {
  const [user, setUser] = useState({});
  const [userIDB, setUserIDB] = useState([]);
  const idb = window.indexedDB;

  // get user data from indexedDB
  const getUserData = () => {
    const dbPromise = idb.open("firebaseLocalStorageDb");

    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const tx = db.transaction("firebaseLocalStorage", "readonly");
      const userDataTx = tx.objectStore("firebaseLocalStorage");
      const userData = userDataTx.getAll();

      userData.onsuccess = (query) => {
        console.log(query.srcElement.result.map((res) => res));
        setUserIDB(query.srcElement.result.map((res) => res.value));
      };

      userData.onerror = (query) => {
        console.log("Error:", query);
      };

      tx.oncomplete = () => {
        db.close();
      };
    };

    dbPromise.onerror = (event) => {
      console.log("Error: ", event);
    };
  };

  useEffect(() => {
    getUserData();
  }, []);

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
            <button
              onClick={logout}
              className="btn logoutbtn"
              style={{ border: "0.5px solid black" }}
            >
              Sign out
            </button>
            <h3 className=" mt-4">
              <u>User Data</u>
            </h3>
            <br />
            {/* displaying user data */}
            {userIDB.map((user, index) => (
              <>
                <div>
                  <b>profilePhoto: </b>
                  <img
                    src={user.photoURL}
                    width="100px"
                    height="100px"
                    alt="upload profile picture to your email"
                  />
                </div>
                <div>
                  <b>uid: </b> {user.uid}
                </div>
                <div>
                  <b>displayName: </b>
                  {user.displayName}
                </div>
                <div>
                  <b>email:</b> {user.email}
                </div>
                <div>
                  <b>phoneNumber: </b> {user.phoneNumber}
                </div>
                <div>
                  <b>createdAt: </b> {user.createdAt}
                </div>
                <div>
                  <b>lastLoginAt: </b> {user.lastLoginAt}
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
