import React from "react";

export default function UserProfile({ profileImgFileUrl, name, city, about }) {
  return (
    <div className="profile-main">
      <div class="container text-center align-self-center">
        <div className="row">
          <div className="col ">
            <img
              src={profileImgFileUrl}
              alt="..."
              width="120"
              class="mb-2 img-thumbnail image"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1 class="text-uppercase">{name}</h1>
          </div>
        </div>

        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            ABOUT ME
          </button>
        </p>
        <div class="collapse" id="collapseExample">
          <div class="card profile-card-body">
            <h2> {about}</h2>
          </div>
        </div>
        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample2"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            CITY
          </button>
        </p>
        <div class="collapse" id="collapseExample2">
          <div class="card profile-card-body">
            <h2>{city}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
