import { Dashboard } from "@/components/Dashboard";
import { Sidebar } from "@/components/Sidebar";
import { setStore } from '@/lib/capsule-slice'
import type { Capsules } from '@/types'
import { GeistSans } from "geist/font/sans";
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from "next/head";
import React from 'react'
import { useDispatch } from 'react-redux'

export const getStaticProps: GetStaticProps<{ data: Capsules }> = async () => {
	const resp = await fetch(
		'https://api.spacexdata.com/v3/capsules?sort=capsule_serial&order=desc'
	)
	const data = await resp.json()

	return {
		props: { data },
	}
}

export default function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
	const dispatch = useDispatch()

	// stores data in redux store on first load
	React.useEffect(() => {
		dispatch(setStore(data))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Head>
				<title>Clickit FE</title>
			</Head>

			<main
				className={`${GeistSans.variable} font-[family-name:var(--font-geist-sans)] bg-zinc-50 text-slate-600 x-auto grid min-h-dvh max-w-screen-2xl grid-cols-1 lg:grid-cols-[250px_1fr]`}>
				<Sidebar />
				<Dashboard />
			</main>
		</>
	)
}
