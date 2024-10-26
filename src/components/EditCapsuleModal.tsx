import { Plus, ShieldWarning } from '@phosphor-icons/react'
import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import * as React from 'react'
import * as Yup from 'yup'

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
]

export const EditCapsuleModal = () => {
	const [visible, setVisible] = React.useState(false)

	const formik = useFormik({
		initialValues: {
			capsule_id: '',
			status: '',
			original_launch_date: undefined,
		},
		validationSchema: Yup.object({
			capsule_id: Yup.string().required('Capsule ID is required'),
			status: Yup.string().required('Please select a status'),
			original_launch_date: Yup.date().required('Please choose a launch date'),
		}),
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2))
		},
	})

	const onCloseModal = () => {
		if (!visible) return
		setVisible(false)
	}

	return (
		<>
			<Button
				type='button'
				label='Add Capsule'
				icon={<Plus />}
				className='text-sm bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 flex items-center gap-1 py-2 px-4'
				onClick={() => setVisible(true)}
			/>

			<Dialog
				header='Edit capsule'
				visible={visible}
				onHide={onCloseModal}
				breakpoints={{ '960px': '75vw', '641px': '100vw' }}
				style={{ width: '35vw' }}>
				<form className='text-base flex flex-col gap-6' onSubmit={formik.handleSubmit}>
					<div className='flex flex-col gap-2'>
						<label htmlFor='capsule_id' className='font-semibold'>
							Capsule ID
						</label>
						<InputText
							type='text'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.capsule_id}
							id='capsule_id'
							className={`w-full rounded-md py-3 px-4 ${
								formik.touched.capsule_id && formik.errors.capsule_id
									? 'border-red-600 border-2 bg-red-50/50'
									: 'border border-slate-300 bg-slate-50'
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
						<label htmlFor='capsule_id' className='font-semibold'>
							Status
						</label>

						<Dropdown
							checkmark={true}
							highlightOnSelect={false}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.status}
							options={cities}
							optionLabel='name'
							placeholder='Select a status'
							className={`w-full rounded-md ${
								formik.touched.status && formik.errors.status
									? 'border-red-600 border-2 bg-red-50/50'
									: 'border border-slate-300 bg-slate-50'
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
						<label htmlFor='capsule_id' className='font-semibold'>
							Original Launch Date <span className='text-red-600'>*</span>
						</label>
						<Calendar
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.original_launch_date}
							showButtonBar
							id='capsule_id'
							placeholder='DD/MM/YYYY'
							dateFormat='dd/mm/yy'
							className={`w-full rounded-md py-3 px-4 ${
								formik.touched.original_launch_date &&
								formik.errors.original_launch_date
									? 'border-red-600 border-2 bg-red-50/50'
									: 'border border-slate-300 bg-slate-50'
							}`}
						/>
						{formik.touched.original_launch_date &&
						formik.errors.original_launch_date ? (
							<div className='flex items-center gap-1 text-red-600 font-medium text-xs'>
								<ShieldWarning weight='fill' className='text-base' />
								<p>{formik.errors.original_launch_date}</p>
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
							label='Update'
							className='text-sm w-48 bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 flex items-center gap-1 py-3 px-4'
						/>
					</footer>
				</form>
			</Dialog>
		</>
	)
}
