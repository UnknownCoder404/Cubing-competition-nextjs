import dashboardStyles from "./Dashboard.module.css";
import manageAccounts from "../public/manage_accounts.svg";
import Image from "next/image";
import { isUser } from "../utils/credentials";
import UserCompAndButtons from "./UserCompAndButtons";
import { CompetitionType, User } from "../Types/solve";

function UsernameDiv({ username }: { username: string }) {
    return (
        <div
            className={dashboardStyles["username-div"]}
            aria-labelledby="username"
        >
            <p id="username" className={dashboardStyles["username"]}>
                {username}
            </p>
            <Image
                className={dashboardStyles["manage-accounts"]}
                src={manageAccounts}
                width={24}
                height={24}
                alt="Manage accounts button for user settings"
            />
        </div>
    );
}

function UserInfo({ user }: { user: User }) {
    return (
        <>
            <UsernameDiv username={user.username} />
            <p className={dashboardStyles["role"]} aria-label="User role">
                Uloga: {isUser(user.role) ? "Korisnik" : "Administrator"}
            </p>
            <p className={dashboardStyles["group"]} aria-label="User group">
                Grupa: {user.group}
            </p>
        </>
    );
}

export default function UserDashboard({
    user,
    competitions,
}: {
    user: User;
    competitions: CompetitionType[];
}) {
    return (
        <section className={dashboardStyles["user"]}>
            <UserInfo user={user} />
            <UserCompAndButtons user={user} competitions={competitions} />
        </section>
    );
}
