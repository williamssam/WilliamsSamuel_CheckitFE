import { addCapsule, useCapsules } from '@/lib/capsule-slice'
import { Plus, ShieldWarning } from '@phosphor-icons/react'
import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
	capsule_id: yup.string().required('Capsule ID is required'),
	status: yup.string().required('Please select a status'),
	original_launch: yup.string().required('Please choose a launch date').lowercase(),
})

const initialValues = {
	capsule_id: '',
	status: '',
	original_launch: undefined,
}

export const AddCapsuleModal = () => {
	const toast = React.useRef<Toast>(null)
	const capsules = useCapsules()
	const dispatch = useDispatch()
	const [visible, setVisible] = React.useState(false)

	const formik = useFormik({
		initialValues,
		validationSchema: validationSchema,
		onSubmit: async values => {
			dispatch(addCapsule(values))
			setVisible(false)
			toast.current?.show({
				severity: 'success',
				summary: 'Success',
				detail: 'Capsule added successfully!',
				life: 3000,
			})
			formik.resetForm()
		},
	})

	const statues = [...new Set(capsules.map(capsule => capsule.status))]
	const capsule_ids = [...new Set(capsules.map(capsule => capsule.capsule_id))]

	const onCloseModal = () => {
		if (!visible) return
		formik.resetForm()
		setVisible(false)
	}

	return (
		<>
			<Button
				type='button'
				label='Add Capsule'
				icon={<Plus />}
				className='text-sm bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 flex items-center gap-1 py-3 px-4'
				onClick={() => setVisible(true)}
			/>

			<Toast ref={toast} />
			<Dialog
				header='Add new capsule'
				visible={visible}
				onHide={onCloseModal}
				breakpoints={{ '960px': '75vw', '641px': '100vw' }}
				style={{ width: '35vw' }}>
				<form className='text-base flex flex-col gap-6' onSubmit={formik.handleSubmit}>
					<div className='flex flex-col gap-2'>
						<label htmlFor='capsule_id' className='font-semibold'>
							Capsule ID
						</label>
						<Dropdown
							checkmark={true}
							id='capsule_id'
							highlightOnSelect={false}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.capsule_id}
							options={capsule_ids}
							panelClassName='capitalize'
							placeholder='Select capsule ID'
							className={`w-full rounded-md capitalize ${
								formik.touched.capsule_id && formik.errors.capsule_id
									? 'border-red-600 border-2 bg-red-50/50'
									: 'border border-slate-300 bg-transparent'
							}`}
						/>

						{formik.touched.capsule_id && formik.errors.capsule_id ? (
							<div className='flex items-center gap-1 text-red-600 font-medium text-xs'>
								<ShieldWarning weight='fill' className='text-base' />
								<p>{formik.errors.capsule_id}</p>
							</div>
						) : null}
					</div>

					<div className='flex flex-col gap-2'>
						<label htmlFor='status' className='font-semibold'>
							Status
						</label>

						<Dropdown
							checkmark={true}
							id='status'
							highlightOnSelect={false}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.status}
							options={statues}
							panelClassName='capitalize'
							placeholder='Select status'
							className={`w-full rounded-md capitalize ${
								formik.touched.status && formik.errors.status
									? 'border-red-600 border-2 bg-red-50/50'
									: 'border border-slate-300 bg-transparent'
							}`}
						/>

						{formik.touched.status && formik.errors.status ? (
							<div className='flex items-center gap-1 text-red-600 font-medium text-xs'>
								<ShieldWarning weight='fill' className='text-base' />
								<p>{formik.errors.status}</p>
							</div>
						) : null}
					</div>

					<div className='flex flex-col gap-2'>
						<label htmlFor='original_launch' className='font-semibold'>
							Original Launch Date <span className='text-red-600'>*</span>
						</label>
						<Calendar
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.original_launch}
							showButtonBar
							id='original_launch'
							placeholder='DD/MM/YYYY'
							dateFormat='dd/mm/yy'
							className={`w-full rounded-md py-3 px-4 ${
								formik.touched.original_launch && formik.errors.original_launch
									? 'border-red-600 border-2 bg-red-50/50'
									: 'border border-slate-300 bg-transparent'
							}`}
						/>
						{formik.touched.original_launch && formik.errors.original_launch ? (
							<div className='flex items-center gap-1 text-red-600 font-medium text-xs'>
								<ShieldWarning weight='fill' className='text-base' />
								<p>{formik.errors.original_launch}</p>
							</div>
						) : null}
					</div>

					<footer className='flex items-center justify-end gap-3'>
						<Button
							type='button'
							label='Cancel'
							onClick={onCloseModal}
							className='text-sm w-32 bg-red-100 text-red-600 hover:bg-red-800 hover:text-red-50 flex items-center gap-1 py-3 px-4'
						/>
						<Button
							type='submit'
							label='Submit'
							className='text-sm w-48 bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 flex items-center gap-1 py-3 px-4'
						/>
					</footer>
				</form>
			</Dialog>
		</>
	)
}
