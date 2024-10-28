 /* eslint-disable @typescript-eslint/no-explicit-any */
import { MagnifyingGlass } from '@phosphor-icons/react'
import { useFormik } from 'formik'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import React from 'react'

type SearchInputProps = {
	filters: any
	setFilters: React.Dispatch<React.SetStateAction<any>>
}

export const SearchInput = ({ filters, setFilters }: SearchInputProps) => {
	console.log('re-rendered')
	// const capsules = useCapsules()
	const formik = useFormik({
		initialValues: {
			search: '',
		},
		onSubmit: values => console.log('values', values),
	})

	React.useEffect(() => {
		const _filters = { ...filters }

		_filters['global'].value = formik.values.search

		setFilters(_filters)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.search])

	return (
		<div className='flex items-center'>
			<IconField className='ml-auto' iconPosition='left'>
				<InputIcon>
					<MagnifyingGlass />
				</InputIcon>
				<InputText
					type='search'
					name='search'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.search}
					aria-labelledby='search for a capsule'
					placeholder='Search for a capsule'
					className='md:w-96 rounded-md py-3 px-4 text-sm font-normal pl-9 border border-slate-300 bg-white'
				/>
			</IconField>
		</div>
	)
}
