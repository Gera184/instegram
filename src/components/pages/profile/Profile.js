import React, { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Profile.css";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [usersId, setUsersId] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    getDoc();

    // if (db) {
    //   const unsubscribe = db
    //     .collection("instegram")
    //     .orderBy("createdAt")
    //     .limit(100)
    //     .onSnapshot((querySnapshot) => {
    //       const data = querySnapshot.docs.map((doc) => ({
    //         ...doc.data(),
    //         id: doc.id,
    //       }));
    //       setUsers(data);
    //     });

    //   return unsubscribe;
    // }
  }, [db]);

  async function getDoc() {
    await db
      .collection("instegram")
      .orderBy("createdAt")
      .limit(100)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(data);
      });
  }
  console.log(users);
  // useEffect(() => {
  //   db.collection("instegram")
  //     .doc.id.get()
  //     .then((snapshot) => setUserDetails(snapshot.data()));
  // }, [db]);

  return (
    <>
      {users.map((user) => (
        <div class="row py-5 px-4 profile-main">
          <div class="col-md-5 mx-auto">
            <div class="bg-white shadow rounded overflow-hidden">
              <div class="px-4 pt-0 pb-4 cover">
                <div class="media align-items-end profile-head">
                  <div class="profile mr-3">
                    <img
                      src={user.profileImgFileUrl}
                      alt="..."
                      width="130"
                      class="rounded mb-2 img-thumbnail"
                    />
                    <a href="#" class="btn btn-outline-dark btn-sm btn-block">
                      Edit profile
                    </a>
                  </div>
                  <div class="media-body mb-5 text-white">
                    <h4 class="mt-0 mb-0">{user.name}</h4>
                    <p class="small mb-4">
                      {" "}
                      <i class="fas fa-map-marker-alt mr-2"></i>
                      {user.city}
                    </p>
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
                <div class="p-4 rounded shadow-sm bg-light">
                  <p class="font-italic mb-0">{user.about}</p>
                </div>
              </div>
              <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <h5 class="mb-0">Recent photos</h5>
                  <a href="#" class="btn btn-link text-muted">
                    Show all
                  </a>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
