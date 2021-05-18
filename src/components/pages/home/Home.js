import React, { useState, useEffect, useRef } from "react";
import Carusel from "../carusel/Carusel";
import { useAuth } from "../../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { db } from "../../firebase.js";
import "./Home.css";
import UserProfile from "../user-profile/UserProfile";

export default function Home() {
  const [profileImgs, setProfileImgs] = useState([]);
  const [user_index, setUser_index] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("instegram")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setProfileImgs(data);
        });

      return unsubscribe;
    }
  }, [db]);

  if (loading === true) {
    window.location.href = `/user-profile/${
      profileImgs ? profileImgs[user_index].uid : " "
    }`;
  }

  return (
    <>
      <div class="masthead">
        <Carusel />
      </div>
      <section class="py-5">
        <div class="container text-center align-self-center">
          <div class="row">
            <div class="col">
              <h1>Latest users</h1>
            </div>
          </div>
          <div class="row">
            {profileImgs.map((profileImg, index) => (
              <div class="col">
                <img
                  src={profileImg.profileImgFileUrl}
                  width="150"
                  className="rounded mb-2 img-thumbnail"
                  data-index={index}
                  onClick={(e) => {
                    setUser_index(e.target.getAttribute("data-index"));
                    setLoading(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
