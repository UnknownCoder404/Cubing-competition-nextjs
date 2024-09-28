"use client";

import { CompetitionType, Users } from "../Types/solve";
import styles from "./AdvancedDashboard.module.css";
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
      <Excel competitions={competitions} users={users} />
      <ChangePasswordForm users={users} />
    </div>
  );
}
