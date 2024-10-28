import { useCapsule } from '@/lib/capsule-slice'
import { formatDate } from '@/utils'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Sidebar } from 'primereact/sidebar'

type CapsuleDetailModalProps = {
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const CapsuleDetailModal = ({ visible, setVisible }: CapsuleDetailModalProps) => {
	const capsule = useCapsule()

	return (
		<Sidebar
			visible={visible}
			onHide={() => setVisible(false)}
			position='right'
			header={<h2 className='font-bold text-lg'>Capsule Details</h2>}>
			{/* <h2>Capsule Details</h2> */}

			<ul className='flex flex-col gap-6 text-sm'>
				<li>
					<p className='font-bold'>ID</p>
					<p>{capsule?.capsule_id}</p>
				</li>
				<li>
					<p className='font-bold'>Type</p>
					<p>{capsule?.type}</p>
				</li>
				<li>
					<p className='font-bold'>Serial Number</p>
					<p>{capsule?.capsule_serial}</p>
				</li>
				<li>
					<p className='font-bold'>Status</p>
					<p>{capsule?.status}</p>
				</li>
				<li>
					<p className='font-bold'>Original Launch Date</p>
					<p>{formatDate(capsule?.original_launch as string)}</p>
				</li>
				<li>
					<p className='font-bold'>Number of Landings</p>
					<p>{capsule?.landings.toLocaleString()}</p>
				</li>
				<li>
					<p className='font-bold'>Reuse Count</p>
					<p>{capsule?.reuse_count.toLocaleString()}</p>
				</li>

				<li>
					<p className='font-bold'>Details</p>
					<p>{capsule?.details}</p>
				</li>

				<li className='flex flex-col gap-1'>
					<p className='font-bold'>Missions</p>

					<DataTable value={capsule?.missions} className='text-sm' size='small'>
						<Column field='name' header='Name'></Column>
						<Column field='flight' header='No. of flights'></Column>
					</DataTable>
				</li>
			</ul>
		</Sidebar>
	)
}
