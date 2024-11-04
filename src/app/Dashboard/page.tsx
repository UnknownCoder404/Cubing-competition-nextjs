import UserDashboard from "./UserDashboard";
import dashboardStyles from "./Dashboard.module.css";
import Link from "next/link";
import { getUsers } from "../utils/users";
import { getCompetitions } from "../utils/competitions";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0; // Ensure no caching between requests

export const metadata: Metadata = {
    title: "Radna ploča - Cro Cube Comp",
    description: "Prikaz korisnika i njihovih natjecanja",
    keywords: ["Cro Cube Comp", "Radna ploča"],
};

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
