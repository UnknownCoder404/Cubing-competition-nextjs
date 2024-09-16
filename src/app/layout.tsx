import "@/globals.css";
import Header from "./components/Header/Header";
import { headers } from "next/headers";
const hideHeaderRoutes: string[] = [""];

const titleToShow: {
  [index: string]: string | undefined;
} = {
  "/": "Cro Cube Comp",
  "/Login": "Prijava",
  "/Register": "Registracija",
  "/Competitions": "Natjecanja",
  "/Scramble": "Vježbanje",
  "/Dashboard": ".",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathName = headersList.get("x-pathname")!;
  const shouldShowHeader = !hideHeaderRoutes.includes(pathName);

  return (
    <html lang="hr">
      <body>
        {shouldShowHeader && (
          <Header title={titleToShow[pathName] || "Cro Cube Comp"} />
        )}
        {children}
      </body>
    </html>
  );
}
