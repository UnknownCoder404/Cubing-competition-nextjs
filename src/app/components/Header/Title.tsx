"use client"; // Mark this as a client-side component
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import headerStyles from "./Header.module.css";

function ClientTitle() {
  const pathname = usePathname(); // Get the current pathname
  const [title, setTitle] = useState<string>("");

  const routeTitles: {
    [index: string]: string | undefined;
  } = {
    "/": "Cro Cube Comp",
    "/Login": "Prijava",
    "/Register": "Registracija",
    "/Competitions": "Natjecanja",
    "/Scramble": "Vježbanje",
    "/Dashboard": "Radna ploča",
    "/Advanced-Dashboard": "Radna ploča",
  };

  useEffect(() => {
    // Update the title based on the current pathname
    const currentTitle = routeTitles[pathname] || "Cro Cube Comp";
    setTitle(currentTitle);
  }, [pathname]); // Re-run when pathname changes

  return <h1 className={headerStyles["title"]}>{title}</h1>;
}

export default ClientTitle;
