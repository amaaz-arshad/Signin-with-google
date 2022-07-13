import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { Card, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
        });
      });
  };

  const register = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      name: data.get("name"),
      password: data.get("password"),
    });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );

      await updateProfile(auth.currentUser, {
        displayName: data.get("name"),
      });
      console.log(result);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
      });
      setIsLoading(false);
    }

    // createUserWithEmailAndPassword(
    //   auth,
    //   data.get("email"),
    //   data.get("password")
    // )
    //   .then(function (result) {
    //     const user = auth.currentUser;
    // return user.updateProfile({
    //   displayName: newUser.name
    // })
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
  };

  return (
    <>
      {/* <Header /> */}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="loginCard">
            <h4 className="mt-2 mb-3 text-center">Sign Up</h4>
            <Box component="form" onSubmit={register}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                name="name"
                label="Full Name"
                size="small"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                size="small"
              />
              {!isLoading ? (
                <button
                  type="submit"
                  className="btn btn-primary mt-3 form-control"
                >
                  Sign Up
                </button>
              ) : (
                <button disabled className="btn btn-primary form-control mt-3">
                  <span>
                    Signing up
                    <span
                      className="ms-2 spinner-border spinner-border-sm text-light"
                      role="status"
                    ></span>
                  </span>
                </button>
              )}

              <div className="text-center">
                <Link
                  className="nav-link"
                  to="/login"
                  style={{ fontSize: "13px" }}
                >
                  Have an account already? Sign in!
                </Link>
              </div>
            </Box>
            <p className="text-center">OR</p>
            <button
              onClick={signInWithGoogle}
              className="btn btn-light form-control btnGoogle"
            >
              <span className="me-2">Sign Up with Google</span>
              <FcGoogle size={25} />
            </button>
          </Card>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
