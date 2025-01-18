import dashboardStyles from "./Dashboard.module.css";
import Link from "next/link";
import { getUsers } from "../utils/users";
import { getCompetitions } from "../utils/competitions";
import { Metadata } from "next";
import ProtectedRoute from "../components/Common/ProtectedRoute";
import Users from "./Users";

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
            <Link href="/Advanced-Dashboard" prefetch={true}>
                <button className={dashboardStyles["advanced-dashboard-btn"]}>
                    Napredna radna ploča
                </button>
            </Link>
            <Link href="/Register" prefetch={true}>
                <button className={dashboardStyles["register-btn"]}>
                    Registracija korisnika
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
        <ProtectedRoute require="admin" redirectTo="/Login" validateToken>
            <Buttons />
            <Users users={users.parsed} competitions={competitions.parsed} />
        </ProtectedRoute>
    );
}
