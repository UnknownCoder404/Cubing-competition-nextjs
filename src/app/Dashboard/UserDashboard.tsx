import { User } from "./page";
import dashboardStyles from "./Dashboard.module.css";

export default function UserDashboard({ user }: { user: User }) {
  return (
    <div className={dashboardStyles["user"]}>
      <h1>{user.username}</h1>
      <p>Group: {user.group}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
