"use client"; // This makes this component a client-side component
import { useState, useEffect } from "react";
import Link from "next/link";
import headerStyles from "./Header.module.css";
import { loggedIn } from "@/app/utils/credentials";

function ClientLoginStatus() {
  const [username, setUsername] = useState<null | string>(null);
  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(false);
  useEffect(() => {
    const loggedInStatus = loggedIn();
    const username = localStorage.getItem("username");

    setLoggedInStatus(!!loggedInStatus);
    setUsername(username);
  }, []);

  return (
    <>
      {loggedInStatus ? (
        <h2 className={headerStyles["log-in"]}>{username}</h2>
      ) : (
        <h2 className={headerStyles["log-in"]}>
          <Link href="Login/">Prijava</Link>
        </h2>
      )}
    </>
  );
}

export default ClientLoginStatus;
