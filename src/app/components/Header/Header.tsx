import "@/globals.css";
import headerStyles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
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
              priority={true}
            />
          </Link>
        </div>
        <div className={headerStyles["title-container"]}>
          <h1 className={headerStyles["title"]}>{title}</h1>
        </div>
      </div>
      <div className={headerStyles["account-container"]}>
        <ClientLoginStatus /> {/* Render the client-side login status */}
      </div>
    </header>
  );
}
