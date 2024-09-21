import dashboardStyles from "./Dashboard.module.css";
import manageAccounts from "../public/manage_accounts.svg";
import Image from "next/image";
import { isUser } from "../utils/credentials";
import UserCompAndButtons from "./UserCompAndButtons";
import { User } from "../Types/solve";

function UsernameDiv({ username }: { username: string }) {
  return (
    <div className={dashboardStyles["username-div"]}>
      <p className={dashboardStyles["username"]}>{username}</p>
      <Image
        className={dashboardStyles["manage-accounts"]}
        src={manageAccounts}
        width={undefined}
        height={24}
        alt="Manage accounts"
      />
    </div>
  );
}

function UserInfo({ user }: { user: User }) {
  return (
    <>
      <UsernameDiv username={user.username} />
      <p className={dashboardStyles["role"]}>
        Uloga: {isUser(user.role) ? "Korisnik" : "Administrator"}
      </p>
      <p className={dashboardStyles["group"]}>Grupa: {user.group}</p>
    </>
  );
}

export default function UserDashboard({ user }: { user: User }) {
  return (
    <div className={dashboardStyles["user"]}>
      <UserInfo user={user} />
      <UserCompAndButtons user={user} />
    </div>
  );
}
