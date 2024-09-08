"use client"; // This makes this component a client-side component
import Link from "next/link";
import headerStyles from "./Header.module.css";
import { getUsername, loggedIn, logOut } from "@/app/utils/credentials";
import accountCircle from "../../public/account_circle.svg";
import Image from "next/image";

function ClientLoginStatus() {
  const username = getUsername();
  const isloggedIn = loggedIn();
  return (
    <>
      {isloggedIn ? (
        <h2 className={headerStyles["log-in"]}>{username}</h2>
      ) : (
        <h2 className={headerStyles["log-in"]}>
          <Link href="Login/">Prijava</Link>
        </h2>
      )}

      <Image
        alt="account circle"
        className={`${headerStyles["account-circle"]} ${
          isloggedIn ? headerStyles["logged-in"] : ""
        }`}
        src={accountCircle}
        width={24}
        height={24}
        onClick={() => {
          if (isloggedIn) {
            logOut();
            window.location.reload(); // Refresh the page after logout
          }
        }}
      />
    </>
  );
}

export default ClientLoginStatus;
