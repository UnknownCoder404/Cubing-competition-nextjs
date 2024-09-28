import "@/globals.css";
import Header from "./components/Header/Header";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";

const hideHeaderRoutes: string[] = [""];

const titleToShow: {
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

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "fallback",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathName = headersList.get("x-pathname")!;
  const shouldShowHeader = !hideHeaderRoutes.includes(pathName);

  return (
    <html lang="hr" className={roboto.className}>
      <body>
        {shouldShowHeader && (
          <Header title={titleToShow[pathName] || "Cro Cube Comp"} />
        )}
        {children}
      </body>
    </html>
  );
}
