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
    const data = await fetch(`${url.toString()}users`, {
      signal: AbortSignal.timeout(5000),
    });
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
async function getCompetitions() {
  try {
    const data = await fetch(`${url.toString()}competitions`, {
      signal: AbortSignal.timeout(5000),
    });
    const parsedJSON = await data.json();
    return { success: true, parsed: parsedJSON };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}
export default async function Dashboard() {
  const [users, competitions] = await Promise.all([
    getUsers(),
    getCompetitions(),
  ]);

  if (!users.success) {
    return <p>Nemoguće dohvatiti korisnike</p>;
  }
  if (!competitions.success) {
    return <p>Nemoguće dohvatiti natjecanja</p>;
  }

  return (
    <div className={dashboardStyles["users"]}>
      {users.parsed.map((user) => (
        <UserDashboard
          key={user._id}
          user={user}
          competitions={competitions.parsed}
        />
      ))}
    </div>
  );
}
