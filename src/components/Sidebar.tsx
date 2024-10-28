import SpacceXLogo from '@/assets/icons/SpaceXLogo'
import { GearSix, HouseLine, List, Rocket, SignOut, Users } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { Sidebar as PrimeSidebar } from 'primereact/sidebar'
import * as React from 'react'

const menus = [
	{
		id: 1,
		title: 'dashboard',
		icon: <HouseLine weight='fill' className='text-lg' />,
		route: '/',
	},
	{
		id: 2,
		title: 'customers',
		icon: <Users weight='fill' className='text-lg' />,
		route: '',
	},
	{
		id: 3,
		title: 'rockets',
		icon: <Rocket weight='fill' className='text-lg' />,
		route: '',
	},
	{
		id: 4,
		title: 'settings',
		icon: <GearSix weight='fill' className='text-lg' />,
		route: '',
	},
]

export const Sidebar = () => {
	const router = useRouter()
	const [visible, setVisible] = React.useState(false)

	return (
		<nav className='p-5 lg:p-10 flex flex-row lg:flex-col gap-4 justify-between lg:sticky z-50 lg:top-0 lg:w-auto lg:h-screen lg:self-start'>
			<SpacceXLogo width={150} />

			<ul className='hidden lg:flex flex-col gap-2'>
				{menus.map(menu => (
					<li key={menu.id}>
						<Link
							href='#'
							className={`flex items-center text-sm font-medium capitalize gap-2 py-2.5 px-4 rounded-md transition-colors ${
								router.asPath === menu.route
									? 'bg-slate-800 text-slate-50 font-bold'
									: 'bg-transparent hover:bg-slate-200 text-slate-500'
							}`}>
							{menu.icon}
							<span>{menu.title}</span>
						</Link>
					</li>
				))}
			</ul>

			<button
				type='button'
				className='hidden lg:flex items-center text-sm gap-2 py-2.5 px-4 rounded-md font-medium transition-colors text-red-500 hover:bg-red-600 hover:text-red-50'>
				<SignOut className='text-lg' weight='fill' />
				<span>Log out</span>
			</button>

			{/* mobile menu */}
			<>
				<Button
					type='button'
					className='lg:hidden'
					icon={<List size={32} />}
					onClick={() => setVisible(true)}
				/>

				<PrimeSidebar
					visible={visible}
					position='left'
					onHide={() => setVisible(false)}
					className='h-screen w-64'>
					<ul className='flex flex-col gap-2'>
						{menus.map(menu => (
							<li key={menu.id}>
								<Link
									href='#'
									className={`flex items-center text-sm font-medium capitalize gap-2 py-2.5 px-4 rounded-md transition-colors ${
										router.asPath === menu.route
											? 'bg-slate-800 text-slate-50 font-bold'
											: 'bg-transparent hover:bg-slate-200 text-slate-500'
									}`}>
									{menu.icon}
									<span>{menu.title}</span>
								</Link>
							</li>
						))}
					</ul>
				</PrimeSidebar>
			</>
		</nav>
	)
}
