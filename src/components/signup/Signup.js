import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function hundleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return (
        setError("passwords do not match"),
        (passwordRef.current.value = ""),
        (passwordConfirmRef.current.value = "")
      );
    }

    if (
      passwordRef.current.value === "" ||
      passwordConfirmRef.current.value === "" ||
      emailRef.current.value === ""
    ) {
      return setError("Somthing missing");
    }

    try {
      setError("");
      setLoading(true);

      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create account, Password to weak");
    }

    setLoading(false);
    alert("Account created successfully");
    history.push("/home");
  }

  return (
    <>
      <div className="row align-self-center body">
        <div class="col-md-4  mx-auto p-0">
          <div class="login-card">
            <div class="login-box">
              <div class="login-snip">
                {" "}
                <input id="tab-1" type="radio" name="tab" class="sign-in" />
                <label for="tab-1" class="tab"></label>{" "}
                <input
                  id="tab-2"
                  type="radio"
                  name="tab"
                  class="sign-up"
                  checked
                />
                <label for="tab-2" class="tab">
                  Sign Up
                </label>
                <div class="login-space">
                  <div class="sign-up-form">
                    <div class="group">
                      {" "}
                      <label for="user" class="label">
                        EMAIL
                      </label>{" "}
                      <input
                        id="user"
                        type="text"
                        class="input"
                        placeholder="Put your Email"
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
                        id="pass"
                        type="password"
                        class="input"
                        placeholder="Create your password"
                        ref={passwordRef}
                        required
                      />{" "}
                    </div>
                    <div class="group">
                      {" "}
                      <label for="pass" class="label">
                        Repeat Password
                      </label>{" "}
                      <input
                        id="pass"
                        type="password"
                        class="input"
                        placeholder="Repeat your password"
                        ref={passwordConfirmRef}
                        required
                      />{" "}
                    </div>

                    <button
                      style={{ width: "100%", borderRadius: "50px" }}
                      type="button"
                      class="btn btn-primary btn-lg"
                      onClick={hundleSubmit}
                    >
                      Sign In
                    </button>

                    <div class="hr"></div>
                    <div class="foot">
                      {error && <Alert variant="danger"> {error} </Alert>}{" "}
                      <Link to="/login">Already Member?</Link>{" "}
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
