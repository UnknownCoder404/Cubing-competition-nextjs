import { useState, useCallback } from "react";
import { User, Users } from "../Types/solve";
import styles from "./AdvancedDashboard.module.css";
import UserSelect from "./UserSelect";
import { changePasswordByUsername } from "../utils/users";

export function ChangePasswordForm({ users }: { users: Users }) {
  const [selectedUserToChangePassword, setSelectedUserToChangePassword] =
    useState<User>(users[0]);
  const [newPassword, setPassword] = useState<string>("");
  const [{ message, loading }, setState] = useState({
    message: "",
    loading: false,
  });

  const handlePasswordChange = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newPassword.trim()) {
        setState((prev) => ({
          ...prev,
          message: "Nova lozinka ne može biti prazna.",
        }));
        return;
      }

      setState((prev) => ({ ...prev, message: "", loading: true }));

      try {
        const passwordChange = await changePasswordByUsername(
          selectedUserToChangePassword.username,
          newPassword,
        );

        setState((prev) => ({
          ...prev,
          message: passwordChange.success
            ? "Lozinka je uspješno promijenjena."
            : passwordChange.parsed.message ||
              "Greška prilikom promjene lozinke.",
        }));

        if (passwordChange.success) setPassword(""); // Clear password on success
      } catch (error) {
        console.error(error);
        setState((prev) => ({
          ...prev,
          message: "Došlo je do greške. Pokušajte ponovo.",
        }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [newPassword, selectedUserToChangePassword],
  );

  return (
    <form
      className={styles["change-password-form"]}
      onSubmit={handlePasswordChange}
    >
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
        className={styles["change-password-btn"]}
        disabled={loading || !newPassword.trim()}
      >
        {loading ? "Učitavanje..." : "Promijeni lozinku"}
      </button>
      {message && <p className={styles["message"]}>{message}</p>}
    </form>
  );
}
