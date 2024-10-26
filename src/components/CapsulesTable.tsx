import { formatDate } from '@/utils'
import { PencilSimpleLine, Trash, Warning } from '@phosphor-icons/react'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import * as React from 'react'
import { FilterTable } from './FilterTable'
import { SearchInput } from './SearchInput'

const capsules = [
	{
		capsule_serial: 'C101',
		capsule_id: 'dragon1',
		status: 'retired',
		original_launch: '2010-12-08T15:43:00.000Z',
		original_launch_unix: 1291822980,
		missions: [
			{
				name: 'COTS 1',
				flight: 7,
			},
		],
		landings: 0,
		type: 'Dragon 1.0',
		details: 'Reentered after three weeks in orbit',
		reuse_count: 0,
	},
	{
		capsule_serial: 'C102',
		capsule_id: 'dragon1',
		status: 'retired',
		original_launch: '2012-05-02T07:44:00.000Z',
		original_launch_unix: 1335944640,
		missions: [
			{
				name: 'COTS 2',
				flight: 8,
			},
		],
		landings: 1,
		type: 'Dragon 1.0',
		details: 'First Dragon spacecraft',
		reuse_count: 0,
	},
]

const statues = new Set(capsules.map(capsule => capsule.status))

type Capsule = (typeof capsules)[number]

const CapsulesTable = () => {
	const buttonEl = React.useRef(null)
	const [visible, setVisible] = React.useState(false)

	console.log('statues', statues)
	const actionBodyTemplate = () => {
		return (
			<div className='flex items-center gap-2'>
				<Button
					icon={<PencilSimpleLine weight='fill' className='text-sm' />}
					label='Edit'
					className='mr-2 font-normal text-xs bg-blue-100 px-2 py-1 hover:bg-blue-600 hover:text-blue-50 flex items-center gap-1 text-blue-600'
					// onClick={() => editProduct(rowData)}
				/>
				<Button
					ref={buttonEl}
					icon={<Trash className='text-sm' weight='fill' />}
					label='Delete'
					className='mr-2 font-normal text-xs bg-red-100 px-2 py-1 hover:bg-red-600 hover:text-red-50 flex items-center gap-1 text-red-600'
					onClick={() => setVisible(true)}
					// onClick={() => confirmDeleteProduct(rowData)}
				/>
			</div>
		)
	}

	const getSeverity = (capsule: Capsule) => {
		switch (capsule.status) {
			case 'active':
				return 'success'
			case 'retired':
				return 'warning'
			case 'unknown':
				return 'danger'
			default:
				return null
		}
	}

	const statusBodyTemplate = (capsule: Capsule) => {
		return (
			<Tag value={capsule.status} severity={getSeverity(capsule)} className='uppercase'></Tag>
		)
	}

	const launchDateBodyTemplate = (capsule: Capsule) => {
		return formatDate(capsule.original_launch)
	}

	return (
		<>
			<div className='border border-slate-300 rounded-md flex flex-col gap-6 p-4'>
				<SearchInput />

				<FilterTable />

				<DataTable
					value={capsules}
					paginator
					rows={5}
					size='normal'
					showGridlines
					stripedRows
					className='text-sm'
					// rowsPerPageOptions={[5, 10, 25, 50]}
					tableStyle={{ minWidth: '50rem' }}>
					<Column field='capsule_id' header='Capsule Id'></Column>
					<Column header='Original launch date' body={launchDateBodyTemplate}></Column>
					<Column header='Status' body={statusBodyTemplate}></Column>
					<Column field='type' header='Type'></Column>
					<Column
						header='No of missions'
						body={row => row.missions.length}
						className='text-center'></Column>
					<Column body={actionBodyTemplate} exportable={false} style={{}}></Column>
				</DataTable>
			</div>

			<ConfirmDialog
				group='declarative'
				visible={visible}
				onHide={() => setVisible(false)}
				message='Are you sure you want to proceed?'
				header='Confirmation'
				icon={<Warning weight='fill' className='text-3xl' />}
			/>
		</>
	)
}

export default CapsulesTable
