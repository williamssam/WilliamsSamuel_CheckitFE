import SpacceXLogo from '@/assets/icons/SpaceXLogo'
import { GearSix, HouseLine, Rocket, SignOut, Users } from '@phosphor-icons/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

	return (
		<nav className='p-10 flex flex-col gap-4 justify-between'>
			<SpacceXLogo width={175} />

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

			<button
				type='button'
				className='flex items-center text-sm gap-2 py-2.5 px-4 rounded-md font-medium transition-colors text-red-500 hover:bg-red-800 hover:text-red-100'>
				<SignOut className='text-lg' weight='fill' />
				<span>Log out</span>
			</button>
		</nav>
	)
}
