import React, { useState, useEffect } from "react";
import Carusel from "../carusel/Carusel";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase.js";
import "./Home.css";

export default function Home() {
  const [profileImgs, setProfileImgs] = useState([]);

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

  return (
    <>
      <div class="masthead">
        <Carusel />
      </div>
      <section class="py-5">
        <div class="container text-center align-self-center">
          <div class="row">
            <div class="col">
              <h2>Latest users</h2>
            </div>
          </div>
          <div class="row">
            {profileImgs.map((profileImg) => (
              <div class="col">
                <img
                  src={profileImg.profileImgFileUrl}
                  width="150"
                  className="rounded mb-2 img-thumbnail"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
