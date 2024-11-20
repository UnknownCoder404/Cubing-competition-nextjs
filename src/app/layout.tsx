import "@/globals.css";
import Header from "./components/Header/Header";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";
import ReactQueryProvider from "./components/Providers/react-query-provider";
import Head from "next/head";

const hideHeaderRoutes: string[] = [];
const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
});

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
            <Head>
                <meta
                    name="google-site-verification"
                    content="p4gzWQ-1iXVG0l_lfeyeSHMr_37F_pq6QH3hu8zmL40"
                />
            </Head>
            <body>
                {shouldShowHeader && <Header />}
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
}
