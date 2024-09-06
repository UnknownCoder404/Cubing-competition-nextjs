// Header is hidden on this page
import loginStyles from "./Login.module.css";
export default function Login() {
  return (
    <div className={loginStyles["form-container"]}>
      <form id="loginForm">
        <input
          autoComplete="username"
          type="text"
          id="username"
          name="username"
          placeholder="Korisničko ime"
          className={loginStyles["username-input"]}
          autoFocus
        />
        <br />
        <input
          autoComplete="current-password"
          type="password"
          id="password"
          name="password"
          placeholder="Lozinka"
          className={loginStyles["password-input"]}
        />
        <br />
        <br />
        <button className={loginStyles["submit-btn"]} type="submit">
          Prijava
        </button>
        <div className="message"></div>
      </form>
    </div>
  );
}
