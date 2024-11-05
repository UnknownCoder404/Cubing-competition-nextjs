// Server component
import { CompetitionType, Users } from "../Types/solve";
import styles from "./AdvancedDashboard.module.css";
import Backup from "./Backup";
import { ChangePasswordForm } from "./ChangePasswordForm";
import Excel from "./Excel";

export default function AdvancedDashboard({
    users,
    competitions,
}: {
    users: Users;
    competitions: CompetitionType[];
}) {
    return (
        <div className={styles["options"]}>
            <Excel competitions={competitions} />
            <ChangePasswordForm users={users} />
            <Backup />
        </div>
    );
}
