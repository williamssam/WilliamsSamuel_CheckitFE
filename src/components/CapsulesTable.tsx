/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeCapsule, setCapsule, useCapsules } from '@/lib/capsule-slice'
import { Capsule } from '@/types'
import { formatDate } from '@/utils'
import { PencilSimpleLine, Trash, Warning } from '@phosphor-icons/react'
import { FilterMatchMode } from 'primereact/api'
import { Button } from 'primereact/button'
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { DataTable } from 'primereact/datatable'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { CapsuleDetailModal } from './CapsuleDetailModal'
import { EditCapsuleModal } from './EditCapsuleModal'
import { SearchInput } from './SearchInput'

const getSeverity = (capsule: Capsule) => {
	switch (capsule.status) {
		case 'active':
			return 'success'
		case 'retired':
			return 'warning'
		case 'destroyed':
			return 'danger'
		default:
			return 'secondary'
	}
}

const statusBodyTemplate = (capsule: Capsule) => {
	return <Tag value={capsule.status} severity={getSeverity(capsule)} className='uppercase'></Tag>
}

const CapsulesTable = () => {
	const capsules = useCapsules()
	const dispatch = useDispatch()

	const statuses = [...new Set(capsules.map(capsule => capsule.status))]
	const types = [...new Set(capsules.map(capsule => capsule.type))]

	const buttonEl = React.useRef(null)
	const [visible, setVisible] = React.useState(false)
	const [openEditModal, setOpenEditModal] = React.useState(false)
	const [filters, setFilters] = React.useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		status: { value: null, matchMode: FilterMatchMode.EQUALS },
		type: { value: null, matchMode: FilterMatchMode.EQUALS },
	})
	// 	const [globalFilterValue, setGlobalFilterValue] = React.useState('');

	const actionBodyTemplate = (data: Capsule) => {
		return (
			<div className='flex items-center gap-2'>
				<Button
					icon={<PencilSimpleLine weight='fill' className='text-sm' />}
					label='Edit'
					className='mr-2 font-normal text-xs bg-blue-100 px-2 py-1 hover:bg-blue-600 hover:text-blue-50 flex items-center gap-1 text-blue-600'
					onClick={() => {
						dispatch(setCapsule(data))
						setOpenEditModal(true)
					}}
				/>
				<Button
					ref={buttonEl}
					icon={<Trash className='text-sm' weight='fill' />}
					label='Delete'
					className='mr-2 font-normal text-xs bg-red-100 px-2 py-1 hover:bg-red-600 hover:text-red-50 flex items-center gap-1 text-red-600'
					onClick={() => showTemplate(data.capsule_serial)}
				/>
			</div>
		)
	}

	const launchDateBodyTemplate = (capsule: Capsule) => {
		return capsule?.original_launch ? formatDate(capsule?.original_launch as string) : '-'
	}

	const showTemplate = (id: string) => {
		confirmDialog({
			group: 'templating',
			rejectClassName: 'hidden',
			acceptClassName:
				'text-sm w-full bg-red-600 text-red-100 hover:bg-red-800 hover:text-red-50 flex items-center gap-1 py-3 px-4',
			message: (
				<div className='flex flex-col items-center w-full gap-3'>
					<div className='size-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center'>
						<Warning size={32} weight='fill' />
					</div>

					<div className='text-center flex flex-col gap-2'>
						<h3 className='text-3xl text-red-600 font-bold'>Are you sure?</h3>
						<p className='text-sm'>Please confirm to proceed moving forward.</p>
					</div>
				</div>
			),
			accept: () => dispatch(removeCapsule(id)),
			// reject,
		})
	}

	const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
		return (
			<Dropdown
				value={options.value}
				options={statuses}
				onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
				checkmark={true}
				highlightOnSelect={false}
				placeholder='Select status'
				panelClassName='capitalize'
				className='w-full capitalize rounded-md border border-slate-300 bg-white'
			/>
		)
	}

	const typeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
		return (
			<Dropdown
				value={options.value}
				options={types}
				onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
				checkmark={true}
				highlightOnSelect={false}
				placeholder='Select type'
				className='w-full capitalize rounded-md border border-slate-300 bg-white'
				panelClassName='capitalize'
			/>
		)
	}

	return (
		<>
			<div className='flex flex-col gap-6'>
				<DataTable
					dataKey='capsule_serial'
					emptyMessage='No capsule(s) found.'
					value={capsules}
					filters={filters}
					header={<SearchInput filters={filters} setFilters={setFilters} />}
					globalFilterFields={['details', 'capsule_id', 'capsule_serial', 'status']}
					paginator
					rows={5}
					scrollable
					filterDisplay='menu'
					scrollHeight='400px'
					onRowClick={data => {
						dispatch(setCapsule(data.data as Capsule))
						setVisible(true)
					}}
					className='text-sm'
					// @ts-expect-error error
					rowClassName='hover:bg-slate-100 cursor-pointer'>
					<Column field='capsule_id' header='Capsule ID' className='capitalize'></Column>
					<Column header='Original launch date' body={launchDateBodyTemplate}></Column>
					<Column
						header='Status'
						filter
						filterField='status'
						showFilterMatchModes={false}
						filterElement={statusRowFilterTemplate}
						body={statusBodyTemplate}></Column>
					<Column
						field='type'
						header='Type'
						filter
						filterField='type'
						showFilterMatchModes={false}
						filterElement={typeRowFilterTemplate}></Column>
					<Column
						header='No of missions'
						body={row => row.missions.length}
						className='text-center'></Column>
					<Column body={actionBodyTemplate} exportable={false}></Column>
				</DataTable>
			</div>

			<CapsuleDetailModal visible={visible} setVisible={setVisible} />
			<ConfirmDialog group='templating' />
			<EditCapsuleModal visible={openEditModal} setVisible={setOpenEditModal} />
		</>
	)
}

export default CapsulesTable
