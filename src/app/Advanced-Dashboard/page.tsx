import { url } from "@/globals";
import { CompetitionType, Users } from "../Types/solve";
import AdvancedDashboard from "./AdvancedDashboard";

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
    console.error(error);
    return {
      success: false,
    };
  }
}
async function getCompetitions(): Promise<
  | {
      success: false;
      error: unknown;
    }
  | {
      success: true;
      parsed: CompetitionType[];
    }
> {
  try {
    const data = await fetch(`${url.toString()}competitions`, {
      signal: AbortSignal.timeout(5000),
    });
    const parsedJSON = await data.json();
    return { success: true, parsed: parsedJSON };
  } catch (error: unknown) {
    return {
      success: false,
      error,
    };
  }
}

export default async function AdvancedDashboardPage() {
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
    <AdvancedDashboard
      users={users.parsed}
      competitions={competitions.parsed}
    />
  );
}
