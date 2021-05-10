import React, { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Accordion, Card, Button } from "react-bootstrap";
import "./Profile.css";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    getDoc();
  }, [db]);

  async function getDoc() {
    db.collection("instegram")
      .where("uid", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          // "..." marge the id above with all the data //
          ...doc.data(),
        }));
        setUsers(data);
      });
  }

  console.log(users);

  return (
    <>
      <div className="profile-main">
        <div class="container text-center align-self-center">
          <div className="row">
            <div className="col ">
              <img
                src={users[0] ? users[0].profileImgFileUrl : ""}
                alt="..."
                width="120"
                class="mb-2 img-thumbnail image"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h1 class="text-uppercase">{users[0] ? users[0].name : ""}</h1>
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
              <h2> {users[0] ? users[0].about : ""}</h2>
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
              <h2>{users[0] ? users[0].city : ""}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
