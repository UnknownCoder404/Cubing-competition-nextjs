import "@/globals.css";
import Header from "./components/Header/Header";
import { headers } from "next/headers";
const hideHeaderRoutes: string[] = ["/Login"];
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
        {shouldShowHeader && <Header />}
        {children}
      </body>
    </html>
  );
}
