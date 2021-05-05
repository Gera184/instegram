import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";

import CreateProfile from "../create-profile/CreateProfile";

export default function Main() {
  const { currentUser } = useAuth();

  return (
    <>
      <CreateProfile user={currentUser} db={db} />
    </>
  );
}
