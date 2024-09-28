import { useState, useCallback, useEffect } from "react";
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

  const handlePasswordChange = useCallback(async () => {
    if (!newPassword.trim()) {
      setMessage("Nova lozinka ne može biti prazna.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const passwordChange = await changePasswordByUsername(
        selectedUserToChangePassword.username,
        newPassword,
      );

      if (!passwordChange.success) {
        setMessage(
          passwordChange.parsed.message ||
            (typeof passwordChange.error === "string"
              ? passwordChange.error
              : "Greška prilikom promjene lozinke."),
        );
      } else {
        setMessage(
          passwordChange.parsed.message || "Lozinka je uspješno promijenjena.",
        );
        setPassword(""); // Clear the password after success
      }
    } catch (error) {
      setMessage("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  }, [newPassword, selectedUserToChangePassword]);

  return (
    <div className={styles["change-password-form"]}>
      <div className={styles["change-password-credentials"]}>
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
        onClick={handlePasswordChange}
        className={styles["change-password-btn"]}
        disabled={loading} // Disable if no new password
      >
        {loading ? "Učitavanje..." : "Promijeni lozinku"}
      </button>
      {message && <p className={styles["message"]}>{message}</p>}{" "}
      {/* Show message conditionally */}
    </div>
  );
}
