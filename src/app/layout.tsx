import "@/globals.css";
import Header from "./components/Header/Header";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";
import ReactQueryProvider from "./components/Providers/react-query-provider";
import { VercelToolbar } from "@vercel/toolbar/next";

const hideHeaderRoutes: string[] = [];
const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

const showToolBar: boolean = process.env.SHOW_TOOLBAR === "true";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const pathName = headersList.get("x-pathname")!;
    const shouldShowHeader = !hideHeaderRoutes.includes(pathName);

    return (
        <html lang="hr" className={roboto.className}>
            <meta
                name="google-site-verification"
                content="p4gzWQ-1iXVG0l_lfeyeSHMr_37F_pq6QH3hu8zmL40"
            />

            <body>
                {shouldShowHeader && <Header />}
                <ReactQueryProvider>{children}</ReactQueryProvider>
                {showToolBar && <VercelToolbar />}
            </body>
        </html>
    );
}
