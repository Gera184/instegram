import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function hundleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      alert("Logged in successfully");
      history.push("/home");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <>
      <div className="row align-self-center body">
        <div class="col-md-4  mx-auto p-0">
          <div class="login-card">
            <div class="login-box">
              <div class="login-snip">
                {" "}
                <input
                  id="tab-1"
                  type="radio"
                  name="tab"
                  class="sign-in"
                  checked
                />
                <label for="tab-1" class="tab">
                  Login
                </label>{" "}
                <input id="tab-2" type="radio" name="tab" class="sign-up" />
                <label for="tab-2" class="tab"></label>
                <div class="login-space">
                  <div class="login">
                    <div class="group">
                      {" "}
                      <label for="user" class="label">
                        Email
                      </label>{" "}
                      <input
                        type="email"
                        class="input"
                        placeholder="Enter your email"
                        ref={emailRef}
                        required
                      />{" "}
                    </div>
                    <div class="group">
                      {" "}
                      <label for="pass" class="label">
                        Password
                      </label>{" "}
                      <input
                        type="password"
                        class="input"
                        placeholder="Enter your password"
                        ref={passwordRef}
                        required
                      />{" "}
                    </div>
                    <button
                      style={{ width: "100%", borderRadius: "50px" }}
                      type="submit"
                      class="btn btn-primary btn-lg"
                      onClick={hundleSubmit}
                    >
                      Sign In
                    </button>
                    <div class="hr"></div>
                    {error && <Alert variant="danger"> {error} </Alert>}{" "}
                    <div class="foot">
                      {" "}
                      <a href="/sign-up">Create Account</a>{" "}
                    </div>
                    <div class="foot">
                      {" "}
                      <a href="/contact-us">Forgot Password?</a>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
