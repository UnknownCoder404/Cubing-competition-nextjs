import { useState } from "react";
import { User, Users } from "../Types/solve";
import styles from "./AdvancedDashboard.module.css";
import UserSelect from "./UserSelect";
import { changePasswordByUsername } from "../utils/users";

export function ChangePasswordForm({ users }: { users: Users }) {
  const [selectedUserToChangePassword, setSelectedUserToChangePassword] =
    useState<User>(users[0]);

  const [newPassword, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function changePassword() {
    setMessage("");
    setLoading(true);
    const passwordChange = await changePasswordByUsername(
      selectedUserToChangePassword.username,
      newPassword,
    );

    if (!passwordChange.success) {
      setMessage(
        typeof passwordChange.error === "string"
          ? passwordChange.error
          : "Greška prilikom promjene lozinke.",
      );
      setLoading(false);
      return;
    }

    setMessage(
      passwordChange.parsed.error || "Lozinka je uspješno promijenjena.",
    );
    setLoading(false);
    setPassword("");
  }

  return (
    <div className={styles["change-password-form"]}>
      <div className={styles["change-password-cred"]}>
        <UserSelect
          users={users}
          setSelectedUser={setSelectedUserToChangePassword}
          disabled={loading}
        />
        <div className={styles["password-input-container"]}>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={newPassword}
            type="text"
            placeholder="Nova lozinka"
            className={styles["new-password"]}
            disabled={loading}
          />
        </div>
      </div>
      <button
        onClick={changePassword}
        className={styles["change-password-btn"]}
        disabled={loading}
      >
        {loading ? "Učitavanje..." : "Promijeni lozinku"}
      </button>
      <p className={styles["message"]}>{message}</p>
    </div>
  );
}
