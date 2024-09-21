import { url } from "@/globals";
import { Role } from "../utils/credentials";
import UserDashboard from "./UserDashboard";
import dashboardStyles from "./Dashboard.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Ensure no caching between requests
type AllowedEvents = "3x3" | "4x4" | "3x3oh" | "2x2";

export type UserEvent = {
  event: AllowedEvents;
  rounds: number[][];
};

export type UserComp = {
  competitionId: string;
  events: UserEvent[];
};

export type User = {
  _id: string;
  username: string;
  password: string;
  role: Role;
  competitions: UserComp[];
  group: 1 | 2;
};

type Users = User[];
async function getUsers(): Promise<
  { success: false } | { parsed: Users; success: true; status: number }
> {
  try {
    const data = await fetch(`${url.toString()}users`);
    const parsedJSON = await data.json();
    return {
      parsed: parsedJSON,
      success: data.ok,
      status: data.status,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
export default async function Dashboard() {
  const users = await getUsers();
  if (!users.success) {
    return <p>Nemoguće dohvatiti korisnike</p>;
  }
  return (
    <div className={dashboardStyles["users"]}>
      {users.parsed.map((user) => (
        <UserDashboard key={user._id} user={user} />
      ))}
    </div>
  );
}
