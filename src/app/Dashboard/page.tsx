import { url } from "@/globals";
import UserDashboard from "./UserDashboard";
import dashboardStyles from "./Dashboard.module.css";
import { Users } from "../Types/solve";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Ensure no caching between requests

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
