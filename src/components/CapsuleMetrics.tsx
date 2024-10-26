const metrics = [
	{
		id: 1,
		name: 'total capsules',
		value: 21342,
	},
	{
		id: 2,
		name: 'total active capsules',
		value: 21342,
	},
	{
		id: 3,
		name: 'total destroyed capsules',
		value: 21342,
	},
]

export const CapsuleMetrics = () => {
	return (
		<ul className='grid grid-cols-3 gap-6'>
			{metrics.map(metric => (
				<li key={metric.id} className='p-8 bg-slate-900 rounded-md'>
					<p className='font-extrabold text-4xl text-white'>
						{metric.value.toLocaleString()}
					</p>
					<p className='text-slate-200 text-sm pt-1'>{metric.name}</p>
				</li>
			))}
		</ul>
	)
}
