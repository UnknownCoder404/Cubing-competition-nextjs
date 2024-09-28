import { url } from "@/globals";
import UserDashboard from "./UserDashboard";
import dashboardStyles from "./Dashboard.module.css";
import { Users } from "../Types/solve";
import Link from "next/link";

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
function Buttons() {
  return (
    <nav>
      <Link href="/Advanced-Dashboard">
        <button className={dashboardStyles["advanced-dashboard-btn"]}>
          Napredna radna ploča
        </button>
      </Link>
    </nav>
  );
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
    <>
      <Buttons />
      <div className={dashboardStyles["users"]}>
        {users.parsed.map((user) => (
          <UserDashboard
            key={user._id}
            user={user}
            competitions={competitions.parsed}
          />
        ))}
      </div>
    </>
  );
}
