import headerStyles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import ClientLoginStatus from "./ClientLoginStatus";
import ClientTitle from "./Title";

export default function Header() {
    return (
        <header className={headerStyles["header"]} role="banner">
            <div className={headerStyles["interaction-container"]}>
                <div className={headerStyles["logo-container"]}>
                    <Link href="/" aria-label="Idite na početnu stranicu">
                        <Image
                            alt="Logo of website"
                            className={headerStyles["logo"]}
                            src="/favicon.ico"
                            width={20}
                            height={20}
                            priority={true}
                        />
                    </Link>
                </div>
                <div className={headerStyles["title-container"]}>
                    <ClientTitle />
                </div>
            </div>
            <div className={headerStyles["account-container"]}>
                <ClientLoginStatus />
            </div>
        </header>
    );
}
