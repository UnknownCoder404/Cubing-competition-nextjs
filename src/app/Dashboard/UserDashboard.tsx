import dashboardStyles from "./Dashboard.module.css";
import { isUser } from "../utils/credentials";
import UserCompAndButtons from "./UserCompAndButtons";
import { CompetitionType, User } from "../Types/solve";
import ManageAccountsSvg from "../components/Svg/manage_accounts";

function UsernameDiv({ username }: { username: string }) {
    return (
        <div
            className={dashboardStyles["username-div"]}
            aria-labelledby="username"
        >
            <p id="username" className={dashboardStyles["username"]}>
                {username}
            </p>
            <ManageAccountsSvg
                width="24px"
                height="24px"
                fill="white"
                className={dashboardStyles["manage-accounts"]}
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
