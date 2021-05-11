import React, { useState, useEffect, useRef } from "react";
import Carusel from "../carusel/Carusel";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.js";
import "./Home.css";
import UserProfile from "../user-profile/UserProfile";

export default function Home() {
  const [profileImgs, setProfileImgs] = useState([]);
  const [requested_user_uid, setRequested_user_uid] = useState();
  const [user_index, setUser_index] = useState("");

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

  // const hundleOnSubmit = () => {
  //   db.collection("instegram")
  //     .where(
  //       "uid",
  //       "==",
  //       profileImgs[user_index] ? profileImgs[user_index].uid : ""
  //     )
  //     .orderBy("createdAt")
  //     .onSnapshot((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         // "..." marge the id above with all the data //
  //         ...doc.data(),
  //       }));
  //       setRequested_user_uid(data);
  //     });
  // };

  console.log(profileImgs[user_index]);

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
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <UserProfile
            profileImgFileUrl={profileImgs[user_index]?.profileImgFileUrl}
            name={profileImgs[user_index]?.name}
            city={profileImgs[user_index]?.city}
            about={profileImgs[user_index]?.about}
          />
        </div>
      </section>
    </>
  );
}
