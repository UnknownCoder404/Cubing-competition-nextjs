import "@/globals.css";
import headerStyles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import accountCircle from "../../public/account_circle.svg";
import ClientLoginStatus from "./ClientLoginStatus";

export default function Header({ title }: { title: string }) {
  return (
    <header className={headerStyles["header"]}>
      <div className={headerStyles["interaction-container"]}>
        <div className={headerStyles["logo-container"]}>
          <Link href="/">
            <Image
              alt="logo"
              className={headerStyles["logo"]}
              src="/favicon.ico"
              width={20}
              height={20}
            />
          </Link>
        </div>
        <div className={headerStyles["title-container"]}>
          <h1 className={headerStyles["title"]}>{title}</h1>
        </div>
      </div>
      <div className={headerStyles["account-container"]}>
        <ClientLoginStatus /> {/* Render the client-side login status */}
        <Image
          alt="account circle"
          className={headerStyles["account-circle"]}
          src={accountCircle}
          width={24}
          height={24}
        />
      </div>
    </header>
  );
}