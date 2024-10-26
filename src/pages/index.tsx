import { Dashboard } from "@/components/Dashboard";
import { Sidebar } from "@/components/Sidebar";
import { GeistSans } from "geist/font/sans";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Clickit FE</title>
			</Head>

			<main
				className={`${GeistSans.variable} font-[family-name:var(--font-geist-sans)] bg-slate-50 h-dvh text-slate-600 grid grid-cols-[250px_1fr]`}
			>
				<Sidebar />
				<Dashboard />
			</main>
		</>
	);
}
