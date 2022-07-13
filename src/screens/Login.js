import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { Card, Container } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";

export default function Login() {
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

  const login = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      );
      setIsLoading(false);
      console.log(result);

      navigate("/");
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
      toast.error(error.message, {
        position: "top-right",
        theme: "colored",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "60px" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="loginCard">
            <h4 className="mt-2 mb-3 text-center">Login</h4>
            <Box component="form" onSubmit={login}>
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
              <div className="mb-3">
                <a className="loginLink" style={{ fontSize: "13px" }}>
                  Forgot your password?
                </a>
              </div>
              {!isLoading ? (
                <button
                  type="submit"
                  className="btn btn-primary mt-2 form-control"
                >
                  Sign In
                </button>
              ) : (
                <button disabled className="btn btn-primary form-control mt-2">
                  <span>
                    Signing In
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
                  to="/signup"
                  style={{ fontSize: "13px" }}
                >
                  No account yet? Sign up now!
                </Link>
              </div>
            </Box>
            <p className="text-center">OR</p>
            <button
              onClick={signInWithGoogle}
              className="btn btn-light form-control btnGoogle"
            >
              <span className="me-2">Sign In with Google</span>
              <FcGoogle size={25} />
            </button>
          </Card>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}
