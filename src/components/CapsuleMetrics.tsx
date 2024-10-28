import { useCapsules } from '@/lib/capsule-slice'
import * as React from 'react'

export const CapsuleMetrics = () => {
	const capsules = useCapsules()

	const metric = React.useMemo(
		() => ({
			total_capsules: capsules.length,
			total_active_capsules: capsules.filter(capsule => capsule.status === 'active').length,
			total_destroyed_capsules: capsules.filter(capsule => capsule.status === 'destroyed')
				.length,
			total_retired_capsules: capsules.filter(capsule => capsule.status === 'retired').length,
		}),
		[capsules]
	)

	return (
		<ul className='grid grid-cols-fluid gap-6'>
			<li className='p-8 bg-blue-600 rounded-md'>
				<p className='font-extrabold text-4xl text-white'>
					{metric.total_capsules.toLocaleString()}
				</p>
				<p className='text-slate-200 text-sm pt-1'>Total capsules</p>
			</li>

			<li className='p-8 border-l-[3px] border-l-green-600 bg-green-50 rounded-md'>
				<p className='font-extrabold text-4xl text-green-600'>
					{metric.total_active_capsules.toLocaleString()}
				</p>
				<p className='text-slate-600 text-sm pt-1'>Total active capsules</p>
			</li>

			<li className='p-8 border-l-[3px] border-l-red-600 bg-red-50 rounded-md'>
				<p className='font-extrabold text-4xl text-red-600'>
					{metric.total_destroyed_capsules.toLocaleString()}
				</p>
				<p className='text-slate-600 text-sm pt-1'>Total destroyed capsules</p>
			</li>

			<li className='p-8 border-l-[3px] border-l-amber-600 bg-amber-50 rounded-md'>
				<p className='font-extrabold text-4xl text-amber-600'>
					{metric.total_retired_capsules.toLocaleString()}
				</p>
				<p className='text-slate-600 text-sm pt-1'>Total retired capssules</p>
			</li>
		</ul>
	)
}
