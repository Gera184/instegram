import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext.js";

export default function Header() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory;

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/home");
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/home">
            <img
              style={{ width: "160px", height: "52px" }}
              src="https://jardimbotanicoshopping.com.br/wp-content/plugins/wp-instagram-post/assets/instagram-logo.png"
              alt=""
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/profile">
                  Profile
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/contact-us">
                  Contact us
                </a>
              </li>

              {currentUser ? (
                <>
                  <li class="nav-item">
                    <a class="nav-link" href="/home" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      style={{ color: "black", fontSize: "medium" }}
                      class="nav-link"
                    >
                      {currentUser && currentUser.email}
                    </a>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
