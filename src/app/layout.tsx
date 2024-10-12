import "@/globals.css";
import Header from "./components/Header/Header";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";
import ReactQueryProvider from "./components/Providers/react-query-provider";

const hideHeaderRoutes: string[] = [""];
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
        {shouldShowHeader && <Header />}
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
