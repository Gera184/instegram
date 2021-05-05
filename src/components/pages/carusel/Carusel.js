import React from "react";
import "./Carusel.css";

export default function Carusel() {
  return (
    <>
      <div class="container h-100 ">
        <div class="row align-middle">
          <div class="col-md-6 col-lg-4 column ">
            <div class="card gr-1">
              <div class="txt">
                <h1>ALREADY HAVE ACCOUNT?</h1>
                <p>Explore our app.</p>
              </div>
              <a href="/login">more</a>
              <div class="ico-card">
                <i class="fas fa-arrow-circle-left"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 column">
            <div class="card gr-2">
              <div class="txt">
                <h1>SIGN IN NOW!</h1>
                <p>Sign in now and start making your profile.</p>
              </div>
              <a href="/sign-up">more</a>
              <div class="ico-card">
                <i class="fas fa-plus-circle"></i>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 column">
            <div class="card gr-3">
              <div class="txt">
                <h1>CREATE PROFILE</h1>
                <p>make your first step to progress.</p>
              </div>
              <a href="/create-profile">more</a>
              <div class="ico-card">
                <i class="fas fa-users"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
