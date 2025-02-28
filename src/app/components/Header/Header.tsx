import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import ClientLoginStatus from "./ClientLoginStatus";
import ClientTitle from "./Title";

export default function Header() {
    return (
        <header className={styles["header"]} role="banner">
            <div className={styles["interaction-container"]}>
                <div className={styles["logo-container"]}>
                    <Link href="/" aria-label="Idite na početnu stranicu">
                        <Image
                            alt="Logo of website"
                            className={styles["logo"]}
                            src="/favicon.ico"
                            width={20}
                            height={20}
                            priority={true}
                        />
                    </Link>
                </div>
                <div className={styles["title-container"]}>
                    <ClientTitle />
                </div>
            </div>
            <div className={styles["account-container"]}>
                <ClientLoginStatus />
            </div>
        </header>
    );
}
