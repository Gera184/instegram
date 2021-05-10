import React, { useState, useEffect } from "react";
import firebase from "../../firebase.js";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./CreateProfile.css";

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
      <div class="container create-profile-main">
        <form method="post" onSubmit={handleonSubmit}>
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4 mb-3">
                <div class="create-profile-card">
                  <div class="create-profile-card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        class="rounded-circle"
                        width="150"
                      />
                      <div class="mt-3">
                        <h4>{currentUser.email} </h4>
                        <button
                          class="btn btn-info"
                          style={{ width: "100%" }}
                          type="submit"
                          disabled={
                            !name || !city || !about || !profileImgFileUrl
                          }
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Full Name</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        <input
                          type="text"
                          value={name}
                          placeholder="Full name"
                          required
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">City</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
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

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">About me</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
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

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Profile image</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        <input type="file" onChange={onFileChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProfile;
