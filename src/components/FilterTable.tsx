import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'

const cities = [
	{ name: 'New York', code: 'NY' },
	{ name: 'Rome', code: 'RM' },
	{ name: 'London', code: 'LDN' },
	{ name: 'Istanbul', code: 'IST' },
	{ name: 'Paris', code: 'PRS' },
]

export const FilterTable = () => {
	const formik = useFormik({
		initialValues: {
			capsule_id: '',
			status: '',
			original_launch_date: undefined,
		},
		onSubmit: values => {
			alert(JSON.stringify(values, null, 2))
		},
	})

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='grid grid-cols-4 gap-4 py-4 px-6 border border-slate-300 rounded-md'>
			<Dropdown
				checkmark={true}
				highlightOnSelect={false}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.status}
				options={cities}
				optionLabel='name'
				placeholder='Select a status'
				className='w-full rounded-md border border-slate-300 bg-white'
			/>

			<Calendar
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.original_launch_date}
				showButtonBar
				id='capsule_id'
				placeholder='DD/MM/YYYY'
				dateFormat='dd/mm/yy'
				className='w-full rounded-md py-3 px-4 border border-slate-300 bg-white'
			/>

			<InputText
				type='text'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.capsule_id}
				placeholder='Capsule ID'
				className='w-full rounded-md py-3 px-4 border border-slate-300 bg-white'
			/>

			<Button
				type='submit'
				label='Filter table'
				className='text-sm w-full bg-slate-900 text-slate-50 hover:bg-slate-800 hover:text-slate-50 flex items-center gap-1 py-3 px-4'
			/>
		</form>
	)
}
