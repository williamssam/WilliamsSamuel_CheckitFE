import { AddCapsuleModal } from './AddCapsuleModal'
import { CapsuleMetrics } from './CapsuleMetrics'
import CapsulesTable from './CapsulesTable'

export const Dashboard = () => {
	return (
		<section className='bg-zinc-200 rounded-l-3xl overflow-hidden p-10 flex flex-col gap-10'>
			<div className='space-y-5'>
				<header className='pb-4 py-2 justify-between flex items-center gap-10'>
					<h2 className='text-3xl font-extrabold '>Capsules</h2>

					<AddCapsuleModal />
				</header>

				<CapsuleMetrics />
			</div>

			<CapsulesTable />
		</section>
	)
}
