import React, { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CreateProfile = ({ user = null, db = null }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [about, setAbout] = useState("");
  const [profileImgFileUrl, setProfileImgFileUrl] = useState(null);
  const { uid } = user;
  const history = useHistory();
  const { currentUser } = useAuth();


  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setProfileImgFileUrl(await fileRef.getDownloadURL());
  };

  const handleonSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("instegram").add({
        name: name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        city: city,
        about: about,
        profileImgFileUrl: profileImgFileUrl,
        email: currentUser.email,
        uid,
      });
    }
    alert("Profile created successfully");
    setName("");
    setCity("");
    setAbout("");
    setProfileImgFileUrl(null);
    history.push("/profile");
  };

  return (
    <>
      <div class="row py-5 px-4 profile-main">
        <div class="col-md-5 mx-auto">
          <div class="bg-white shadow rounded overflow-hidden">
            <form method="post" onSubmit={handleonSubmit}>
              <div class="px-4 pt-0 pb-4 cover">
                <div class="media align-items-center profile-head">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                      alt="..."
                      width="130"
                      class="rounded mb-2 img-thumbnail"
                    />
                    <input type="file" onChange={onFileChange} />
                  </div>
                  <div class="media-body small text-white">
                    <input
                      type="text"
                      value={name}
                      placeholder="Full name"
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />{" "}
                    <input
                      type="text"
                      value={city}
                      placeholder="City"
                      required
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="bg-light p-4 d-flex justify-content-end text-center">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">215</h5>
                    <small class="text-muted">
                      {" "}
                      <i class="fas fa-image mr-1"></i>Photos
                    </small>
                  </li>
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">745</h5>
                    <small class="text-muted">
                      {" "}
                      <i class="fas fa-user mr-1"></i>Followers
                    </small>
                  </li>
                  <li class="list-inline-item">
                    <h5 class="font-weight-bold mb-0 d-block">340</h5>
                    <small class="text-muted">
                      {" "}
                      <i class="fas fa-user mr-1"></i>Following
                    </small>
                  </li>
                </ul>
              </div>
              <div class="px-4 py-3">
                <h5 class="mb-0">About</h5>
                <div class="p-0 rounded shadow-sm bg-light">
                  <textarea
                    type="text"
                    value={about}
                    placeholder="type here..."
                    required
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
              <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <h5 class="mb-0">Recent photos</h5>
                </div>
                <div class="row">
                  <div class="col-lg-6 mb-2 pr-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      class="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div class="col-lg-6 mb-2 pl-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      class="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div class="col-lg-6 pr-lg-1 mb-2">
                    <img
                      src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      alt=""
                      class="img-fluid rounded shadow-sm"
                    />
                  </div>
                  <div class="col-lg-6 pl-lg-1">
                    <img
                      src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      alt=""
                      class="img-fluid rounded shadow-sm"
                    />
                  </div>
                </div>
              </div>
              <div class="col">
                <button
                  class="btn btn-info"
                  style={{ width: "100%" }}
                  type="submit"
                  disabled={!name || !city || !about || !profileImgFileUrl}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProfile;
