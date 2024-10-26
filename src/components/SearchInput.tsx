import { InputText } from 'primereact/inputtext'
import * as React from 'react'

export const SearchInput = () => {
	const [value, setValue] = React.useState('')

	return (
		<InputText
			type='search'
			onChange={e => setValue(e.target.value)}
			value={value}
			aria-labelledby='search for a capsule'
			placeholder='Search for a capsule'
			className='w-96 ml-auto rounded-md py-3 px-4 border  border-slate-300 bg-slate-50'
		/>
	)
}
